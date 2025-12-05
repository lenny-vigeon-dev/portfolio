import type { HandLandmarkerResult, NormalizedLandmark } from '@mediapipe/tasks-vision';

export type Point3D = [float: number, float: number, float: number];

export const FIELDS = [
    // Left hand data
    "l_hand_position",
    "l_wrist",
    "l_thumb_cmc",
    "l_thumb_mcp",
    "l_thumb_ip",
    "l_thumb_tip",
    "l_index_mcp",
    "l_index_pip",
    "l_index_dip",
    "l_index_tip",
    "l_middle_mcp",
    "l_middle_pip",
    "l_middle_dip",
    "l_middle_tip",
    "l_ring_mcp",
    "l_ring_pip",
    "l_ring_dip",
    "l_ring_tip",
    "l_pinky_mcp",
    "l_pinky_pip",
    "l_pinky_dip",
    "l_pinky_tip",

    // Right hand data
    "r_hand_position",
    "r_wrist",
    "r_thumb_cmc",
    "r_thumb_mcp",
    "r_thumb_ip",
    "r_thumb_tip",
    "r_index_mcp",
    "r_index_pip",
    "r_index_dip",
    "r_index_tip",
    "r_middle_mcp",
    "r_middle_pip",
    "r_middle_dip",
    "r_middle_tip",
    "r_ring_mcp",
    "r_ring_pip",
    "r_ring_dip",
    "r_ring_tip",
    "r_pinky_mcp",
    "r_pinky_pip",
    "r_pinky_dip",
    "r_pinky_tip",

    // Velocity
    "l_hand_velocity",
    "r_hand_velocity",

    // Face (keeping them for compatibility, but they will be null)
    "m_nose_point", "m_top_nose", "m_eyebrows", "m_forehead", "m_top_chin", "m_bot_up_lip", "m_top_low_lip", "m_bot_nose", "m_chin", "m_nose",
    "l_eye_exterior", "l_temple", "l_mid_chin", "l_up_lip", "l_ext_nostril", "l_mid_cheek", "l_mid_eyebrow", "l_ext_eyebrow", "l_ext_lips", "l_jaw_angle", "l_mid_ext_face", "l_int_eyebrow", "l_mid_jaw", "l_mid_bot_eyelid", "l_ext_mouth", "l_top_eyelid", "l_eye_int", "l_pupil",
    "r_eye_exterior", "r_temple", "r_mid_chin", "r_up_lip", "r_ext_nostril", "r_mid_cheek", "r_mid_eyebrow", "r_ext_eyebrow", "r_ext_lips", "r_jaw_angle", "r_mid_ext_face", "r_int_eyebrow", "r_mid_jaw", "r_mid_bot_eyelid", "r_ext_mouth", "r_top_eyelid", "r_eye_int", "r_pupil",

    // Body
    "l_shoulder", "l_elbow", "l_hip", "l_knee", "l_ankle", "l_body_wrist",
    "r_shoulder", "r_elbow", "r_hip", "r_knee", "r_ankle", "r_body_wrist",
    "m_face_position", "m_body_position", "m_face_scale", "m_body_scale", "l_hand_scale", "r_hand_scale"
] as const;

export type FieldName = typeof FIELDS[number];

export class DataGestures {
    [key: string]: Point3D | null | any;

    constructor() {
        for (const field of FIELDS) {
            this[field] = null;
        }
    }

    static fromHandLandmarkerResult(result: HandLandmarkerResult): DataGestures {
        const gestures = new DataGestures();
        gestures.setHandsFromHandLandmarkerResult(result);
        return gestures;
    }

    setHandsFromHandLandmarkerResult(result: HandLandmarkerResult) {
        if (!result || !result.landmarks) return;

        const handFields = [
            "wrist", "thumb_cmc", "thumb_mcp", "thumb_ip", "thumb_tip",
            "index_mcp", "index_pip", "index_dip", "index_tip",
            "middle_mcp", "middle_pip", "middle_dip", "middle_tip",
            "ring_mcp", "ring_pip", "ring_dip", "ring_tip",
            "pinky_mcp", "pinky_pip", "pinky_dip", "pinky_tip"
        ];
        const handPosId = 9; // middle_mcp
        const handPosId2 = 0; // wrist

        for (let i = 0; i < result.landmarks.length; i++) {
            const handLandmarks = result.landmarks[i];
            const handedness = result.handedness[i][0].categoryName; // "Left" or "Right"
            const prefix = handedness === "Left" ? "l_" : "r_";

            const handPos = this.landmarkToList(handLandmarks[handPosId]) || [0, 0, 0];

            // Calculate scale (distance between wrist and middle_mcp)
            const p1 = handLandmarks[handPosId];
            const p2 = handLandmarks[handPosId2];
            const scale = this.getDistBetweenPoints(
                [p1.x, p1.y, p1.z],
                [p2.x, p2.y, p2.z]
            ) || 1.0;

            this[`${prefix}hand_scale`] = [scale, scale, scale];

            for (let j = 0; j < handFields.length; j++) {
                const fieldName = handFields[j];
                let tmp = this.landmarkToList(handLandmarks[j]);
                if (tmp) {
                    tmp = [
                        -((tmp[0] - handPos[0]) / scale),
                        ((tmp[1] - handPos[1]) / scale),
                        ((tmp[2] - handPos[2]) / scale)
                    ];
                }
                this[`${prefix}${fieldName}`] = tmp;
            }

            this[`${prefix}hand_position`] = [
                (handPos[0] - 0.5),
                (handPos[1] - 0.5),
                (handPos[2] - 0.5)
            ];
        }
    }

    landmarkToList(landmark: NormalizedLandmark | { x: number, y: number, z: number }): Point3D | null {
        if (!landmark) return null;
        return [landmark.x, landmark.y, landmark.z];
    }

    getDistBetweenPoints(p1: Point3D, p2: Point3D): number {
        return Math.sqrt(
            Math.pow(p1[0] - p2[0], 2) +
            Math.pow(p1[1] - p2[1], 2) +
            Math.pow(p1[2] - p2[2], 2)
        );
    }

    moveToOneSide(rightSide: boolean = true) {
        const destSide = rightSide ? "r_" : "l_";
        const srcSide = rightSide ? "l_" : "r_";

        for (const fieldName of FIELDS) {
            if (fieldName.startsWith(srcSide)) {
                let srcSideVal = this[fieldName] as Point3D | null;
                const oppositeFieldName = fieldName.replace(srcSide, destSide);
                const destSideValue = this[oppositeFieldName];

                if (destSideValue === null) {
                    if (srcSideVal !== null) {
                        // Mirror X and Z
                        srcSideVal = [-srcSideVal[0], srcSideVal[1], -srcSideVal[2]];
                    }
                    this[oppositeFieldName] = srcSideVal;
                    this[fieldName] = null;
                }
            }
        }
    }

    get1DArray(validFields: string[]): number[] {
        const result: number[] = [];
        for (const field of validFields) {
            const val = this[field] as Point3D | null;
            if (val) {
                result.push(...val);
            } else {
                result.push(0, 0, 0);
            }
        }
        return result;
    }
}

export class GestureBuffer {
    buffer: DataGestures[] = [];
    memoryFrame: number;

    constructor(memoryFrame: number = 30) {
        this.memoryFrame = memoryFrame;
    }

    addGesture(gesture: DataGestures) {
        this.buffer.push(gesture);
        if (this.buffer.length > this.memoryFrame) {
            this.buffer.shift();
        }
        this.computeVelocity();
    }

    computeVelocity() {
        if (this.buffer.length < 2) return;

        const current = this.buffer[this.buffer.length - 1];
        const prev = this.buffer[this.buffer.length - 2];

        // Right hand velocity
        if (current.r_hand_position && prev.r_hand_position) {
            current.r_hand_velocity = [
                current.r_hand_position[0] - prev.r_hand_position[0],
                current.r_hand_position[1] - prev.r_hand_position[1],
                current.r_hand_position[2] - prev.r_hand_position[2]
            ];
        }

        // Left hand velocity
        if (current.l_hand_position && prev.l_hand_position) {
            current.l_hand_velocity = [
                current.l_hand_position[0] - prev.l_hand_position[0],
                current.l_hand_position[1] - prev.l_hand_position[1],
                current.l_hand_position[2] - prev.l_hand_position[2]
            ];
        }
    }

    getTensorData(validFields: string[]): Float32Array {
        const numFeatures = validFields.length * 3;
        const data = new Float32Array(this.memoryFrame * numFeatures);

        // Fill with zeros if buffer is not full (though usually we just take what we have)
        // But the model expects fixed size input.
        // If buffer is smaller, we pad with zeros at the end? Or beginning?
        // Python code:
        // for i in range(min(sequence_length, len(self.gestures))):
        //    data[i] = self.gestures[i].toTensor(valid_fields)
        // So it fills from the beginning.

        for (let i = 0; i < Math.min(this.memoryFrame, this.buffer.length); i++) {
            const gesture = this.buffer[i];
            const flat = gesture.get1DArray(validFields);
            data.set(flat, i * numFeatures);
        }

        return data;
    }

    reset() {
        this.buffer = [];
    }
}
