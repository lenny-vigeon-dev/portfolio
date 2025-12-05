import * as ort from 'onnxruntime-web';
import { DataGestures, GestureBuffer, type FieldName } from './GestureProcessor';
import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';

// Disable threading and SIMD globally to avoid COOP/COEP issues and potential WASM errors
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = false;
ort.env.wasm.proxy = false; // Disable web worker proxy to run on main thread (avoids synchronization issues)

interface ModelConfig {
    labels: string[];
    memory_frame: number;
    active_gestures: Record<string, boolean | null>;
    one_side?: boolean;
}

export class SignRecognizer {
    session: ort.InferenceSession | null = null;
    config: ModelConfig | null = null;
    buffer: GestureBuffer | null = null;
    validFields: string[] = [];

    constructor() {
    }

    async load(modelPath: string = '/alphabet_30/alphabet_30.onnx', configPath: string = '/alphabet_30/alphabet_30.json') {
        try {
            // Load Config
            const response = await fetch(configPath);
            this.config = await response.json();

            if (!this.config) throw new Error("Failed to load config");

            this.validFields = Object.keys(this.config.active_gestures).filter(key => this.config!.active_gestures[key]);
            this.buffer = new GestureBuffer(this.config.memory_frame);

            // Load Model
            // Ensure full URL to avoid ambiguity
            const modelUrl = new URL(modelPath, window.location.origin).href;

            this.session = await ort.InferenceSession.create(modelUrl, {
                executionProviders: ['wasm', 'cpu'],
            });

            console.log("SignRecognizer loaded successfully");
        } catch (e) {
            console.error("Failed to load SignRecognizer", e);
        }
    }

    predict(result: HandLandmarkerResult): string | null {
        if (!this.session || !this.buffer || !this.config) return null;

        // Process Input
        const gesture = DataGestures.fromHandLandmarkerResult(result);

        if (this.config.one_side) {
            gesture.moveToOneSide(true); // Default to right side as per Python config usually
        }

        this.buffer.addGesture(gesture);

        // Prepare Tensor
        const inputData = this.buffer.getTensorData(this.validFields);
        const tensor = new ort.Tensor('float32', inputData, [this.config.memory_frame, this.validFields.length * 3]);

        // Run Inference
        const feeds: Record<string, ort.Tensor> = {};
        feeds[this.session.inputNames[0]] = tensor;

        // We need to run this async, but predict is usually synchronous in the loop.
        // However, ort.run is async. We might need to handle this.
        // For now, I'll return a Promise or handle it differently.
        // But the user asked for a class that "will load...".
        // I will make predict async.
        return null;
    }

    async predictAsync(result: HandLandmarkerResult): Promise<{ label: string, index: number, score: number } | null> {
        if (!this.session || !this.buffer || !this.config) return null;

        const gesture = DataGestures.fromHandLandmarkerResult(result);

        if (this.config.one_side) {
            gesture.moveToOneSide(true);
        }

        this.buffer.addGesture(gesture);

        // Check if buffer has enough data? Python code fills with zeros if not enough,
        // but usually we wait or just run. The buffer logic fills from start.

        const inputData = this.buffer.getTensorData(this.validFields);
        // Shape: [seq_len, num_features] -> [30, features]
        const tensor = new ort.Tensor('float32', inputData, [this.config.memory_frame, this.validFields.length * 3]);

        const feeds: Record<string, ort.Tensor> = {};
        feeds[this.session.inputNames[0]] = tensor;

        try {
            const results = await this.session.run(feeds);
            const output = results[this.session.outputNames[0]];

            // Find max score
            const data = output.data as Float32Array;
            let maxScore = -Infinity;
            let maxIndex = -1;

            for (let i = 0; i < data.length; i++) {
                if (data[i] > maxScore) {
                    maxScore = data[i];
                    maxIndex = i;
                }
            }

            return {
                label: this.config.labels[maxIndex],
                index: maxIndex,
                score: maxScore
            };
        } catch (e) {
            console.error("SignRecognizer prediction error:", e);
            return null;
        }
    }

    reset() {
        this.buffer?.reset();
    }
}

export class SignDetector {
    session: ort.InferenceSession | null = null;
    config: ModelConfig | null = null;
    buffer: GestureBuffer | null = null;
    validFields: string[] = [];

    constructor() {}

    async load(modelPath: string = '/alphabet_detect_30/alphabet_detect_30.onnx', configPath: string = '/alphabet_detect_30/alphabet_detect_30.json') {
        try {
            const response = await fetch(configPath);
            this.config = await response.json();

            if (!this.config) throw new Error("Failed to load config");

            this.validFields = Object.keys(this.config.active_gestures).filter(key => this.config!.active_gestures[key]);
            this.buffer = new GestureBuffer(this.config.memory_frame);

            const modelUrl = new URL(modelPath, window.location.origin).href;

            this.session = await ort.InferenceSession.create(modelUrl, {
                executionProviders: ['wasm']
            });
            console.log("SignDetector loaded successfully");
        } catch (e) {
            console.error("Failed to load SignDetector", e);
        }
    }

    async predictAsync(result: HandLandmarkerResult): Promise<number | null> {
        if (!this.session || !this.buffer || !this.config) return null;

        const gesture = DataGestures.fromHandLandmarkerResult(result);

        if (this.config.one_side) {
            gesture.moveToOneSide(true);
        }

        this.buffer.addGesture(gesture);

        const inputData = this.buffer.getTensorData(this.validFields);
        const tensor = new ort.Tensor('float32', inputData, [this.config.memory_frame, this.validFields.length * 3]);

        const feeds: Record<string, ort.Tensor> = {};
        feeds[this.session.inputNames[0]] = tensor;

        try {
            const results = await this.session.run(feeds);
            const output = results[this.session.outputNames[0]];

            // Output is a single float value (confidence)
            const data = output.data as Float32Array;
            return data[0];
        } catch (e) {
            console.error("SignDetector prediction error:", e);
            return null;
        }
    }

    reset() {
        this.buffer?.reset();
    }
}
