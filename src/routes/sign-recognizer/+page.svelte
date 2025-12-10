<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
	import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
	import { browser } from '$app/environment';
	import { SignRecognizer, SignDetector } from '$lib/ai/SignModels';
	import BackgroundHandAnimation from '../../components/BackgroundHandAnimation.svelte';

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let handLandmarker: HandLandmarker | undefined = $state(undefined);
	let webcamRunning = $state(false);
	let animationId: number;
	let loading = $state(true);

	let signRecognizer = new SignRecognizer();
	let signDetector = new SignDetector();
	let predictionResult = $state<{ label: string; score: number } | null>(null);
	let detectionScore = $state<number | null>(null);
	let isPredicting = false;

	function getRandomLetter(exclude?: string) {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let letter = letters[Math.floor(Math.random() * letters.length)];
		if (exclude && letter === exclude) return getRandomLetter(exclude);
		return letter;
	}

	let requestedSign = $state(getRandomLetter());
	let matchCount = $state(0);
	let isAnimating = $state(false);

	function triggerAnimation() {
		isAnimating = true;
		setTimeout(() => {
			isAnimating = false;
		}, 300);
	}

	onMount(async () => {
		if (!browser) return;
		try {
			const vision = await FilesetResolver.forVisionTasks(
				'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
			);
			handLandmarker = await HandLandmarker.createFromOptions(vision, {
				baseOptions: {
					modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
					delegate: 'GPU'
				},
				runningMode: 'VIDEO',
				numHands: 1
			});

			await signRecognizer.load("/alphabet_no_null/alphabet_no_null.onnx", "/alphabet_no_null/alphabet_no_null.json");
			await signDetector.load("/alphabet_detect/alphabet_detect.onnx", "/alphabet_detect/alphabet_detect.json");

			loading = false;
		} catch (error) {
			console.error('Error loading hand landmarker:', error);
		}
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(animationId);
			if (video && video.srcObject) {
				const stream = video.srcObject as MediaStream;
				stream.getTracks().forEach((track) => track.stop());
			}
		}
	});

	async function toggleWebcam() {
		if (!handLandmarker) {
			console.log('Wait! handLandmarker not loaded yet.');
			return;
		}

		if (webcamRunning) {
			webcamRunning = false;
			if (video.srcObject) {
				const stream = video.srcObject as MediaStream;
				stream.getTracks().forEach((track) => track.stop());
				video.srcObject = null;
			}
			// Clear canvas
			const ctx = canvas.getContext('2d');
			if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
			return;
		}

		try {
			const constraints = { video: true };
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			video.srcObject = stream;
			video.addEventListener('loadeddata', predictWebcam);
			webcamRunning = true;
		} catch (err) {
			console.error('Error accessing webcam:', err);
		}
	}

	let lastVideoTime = -1;
	let results: HandLandmarkerResult | undefined;

	async function predictWebcam() {
		if (!video || !canvas || !webcamRunning) return;

		// Resize canvas to match video
		if (video.videoWidth !== canvas.width || video.videoHeight !== canvas.height) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
		}

        // Ensure video has valid dimensions before processing
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            animationId = window.requestAnimationFrame(predictWebcam);
            return;
        }

		let startTimeMs = performance.now();
		if (lastVideoTime !== video.currentTime && handLandmarker) {
			lastVideoTime = video.currentTime;
            try {
			    results = handLandmarker.detectForVideo(video, startTimeMs);
            } catch (e) {
                console.error("MediaPipe detection error:", e);
                // If detection fails, skip this frame but continue loop
                animationId = window.requestAnimationFrame(predictWebcam);
                return;
            }

			if (results && !isPredicting) {
                // Check if we have any landmarks detected
                if (results.landmarks && results.landmarks.length > 0) {
                    isPredicting = true;
                    // Run predictions sequentially to avoid "Session already started" error in single-threaded WASM backend
                    signDetector.predictAsync(results)
                        .then((detResult) => {
                            if (detResult !== null) {
                                detectionScore = detResult;
                                if (detResult < 0.5) {
                                    predictionResult = { label: "No sign", score: 0 };
                                    return null;
                                }
                                return signRecognizer.predictAsync(results);
                            }
                            return null;
                        })
                        .then((recResult) => {
                            if (recResult) {
                                predictionResult = { label: recResult.label, score: recResult.score };
								if (predictionResult.label.toUpperCase() === requestedSign) {
									matchCount++;
									triggerAnimation();
									requestedSign = getRandomLetter(requestedSign);
								}
                            }
                            isPredicting = false;
                        })
                        .catch((e) => {
                            console.error(e);
                            isPredicting = false;
                        });
                }
			}
		}

		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (results && results.landmarks) {
				for (const landmarks of results.landmarks) {
					drawConnectors(ctx, landmarks, HandLandmarker.HAND_CONNECTIONS, {
						color: '#00FF00',
						lineWidth: 5
					});
					drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 2 });
				}
			}
			ctx.restore();
		}

		if (webcamRunning) {
			animationId = window.requestAnimationFrame(predictWebcam);
		}
	}

	function drawLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[], style: any) {
		for (const landmark of landmarks) {
			const x = landmark.x * ctx.canvas.width;
			const y = landmark.y * ctx.canvas.height;
			ctx.beginPath();
			ctx.arc(x, y, style.radius || 4, 0, 2 * Math.PI);
			ctx.fillStyle = style.color;
			ctx.fill();
		}
	}

	function drawConnectors(
		ctx: CanvasRenderingContext2D,
		landmarks: any[],
		connections: any[],
		style: any
	) {
		for (const connection of connections) {
			const start = landmarks[connection.start];
			const end = landmarks[connection.end];
			const x1 = start.x * ctx.canvas.width;
			const y1 = start.y * ctx.canvas.height;
			const x2 = end.x * ctx.canvas.width;
			const y2 = end.y * ctx.canvas.height;

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = style.color;
			ctx.lineWidth = style.lineWidth || 2;
			ctx.stroke();
		}
	}
</script>

<!-- <BackgroundHandAnimation /> -->

<div class="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
	<h1 class="mb-4 text-3xl font-bold">Hand Landmark Detection</h1>

	<div class="flex flex-col items-center justify-center gap-8 md:flex-row">
		<div
			class="relative min-h-[240px] min-w-[320px] overflow-hidden rounded-lg bg-black shadow-xl"
		>
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={video} class="block h-full w-full" autoplay playsinline></video>
		<canvas
			bind:this={canvas}
			class="pointer-events-none absolute left-0 top-0 h-full w-full"
		></canvas>

		{#if !webcamRunning && !loading}
			<div class="absolute inset-0 flex items-center justify-center bg-black/50">
				<button
					class="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
					onclick={toggleWebcam}
				>
					Enable Webcam
				</button>
			</div>
		{/if}

		{#if loading}
			<div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
				Loading model...
			</div>
		{/if}
	</div>

	{#if webcamRunning}
		<div
			class="flex min-w-[200px] flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-xl"
		>
			<h2 class="mb-2 text-xl font-bold text-white">Please do sign:</h2>
			<div
				class="mb-4 text-9xl font-bold text-blue-500 transition-all duration-300 {isAnimating
					? 'scale-125 rotate-12 text-green-500'
					: ''}"
			>
				{requestedSign}
			</div>
			<p class="text-gray-300">Matches: {matchCount}</p>
		</div>
	{/if}
	</div>

	{#if webcamRunning}
		<button
			class="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
			onclick={toggleWebcam}
		>
			Stop Camera
		</button>

		<div class="mt-4 text-center">
			{#if predictionResult}
				<p class="text-xl font-bold">Prediction: {predictionResult.label} ({predictionResult.score.toFixed(2)})</p>
			{/if}
			{#if detectionScore !== null}
				<p class="text-lg">Detection Score: {detectionScore.toFixed(2)}</p>
			{/if}
		</div>
	{/if}
</div>
