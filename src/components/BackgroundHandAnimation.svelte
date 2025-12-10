<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	// Standard MediaPipe Hand Connections
	const CONNECTIONS = [
		[0, 1], [1, 2], [2, 3], [3, 4], // Thumb
		[0, 5], [5, 6], [6, 7], [7, 8], // Index
		[0, 9], [9, 10], [10, 11], [11, 12], // Middle
		[0, 13], [13, 14], [14, 15], [15, 16], // Ring
		[0, 17], [17, 18], [18, 19], [19, 20], // Pinky
		[5, 9], [9, 13], [13, 17], [0, 17] // Palm
	];

	// Base hand model (approximate relative 3D coordinates)
    // Normalized to roughly -0.5 to 0.5 range
	const BASE_HAND = [
		{ x: 0, y: 0.4, z: 0 }, // 0: Wrist
		{ x: -0.1, y: 0.35, z: 0 }, { x: -0.15, y: 0.25, z: 0 }, { x: -0.18, y: 0.15, z: 0 }, { x: -0.2, y: 0.05, z: 0 }, // 1-4: Thumb
		{ x: -0.08, y: 0.2, z: 0 }, { x: -0.1, y: 0.05, z: 0 }, { x: -0.11, y: -0.05, z: 0 }, { x: -0.12, y: -0.12, z: 0 }, // 5-8: Index
		{ x: 0, y: 0.2, z: 0 }, { x: 0, y: 0.02, z: 0 }, { x: 0, y: -0.1, z: 0 }, { x: 0, y: -0.18, z: 0 }, // 9-12: Middle
		{ x: 0.08, y: 0.22, z: 0 }, { x: 0.1, y: 0.08, z: 0 }, { x: 0.11, y: -0.02, z: 0 }, { x: 0.12, y: -0.1, z: 0 }, // 13-16: Ring
		{ x: 0.15, y: 0.25, z: 0 }, { x: 0.18, y: 0.15, z: 0 }, { x: 0.2, y: 0.08, z: 0 }, { x: 0.22, y: 0.02, z: 0 }  // 17-20: Pinky
	];

    // Helper to rotate a point in 3D
    function rotatePoint(point: {x: number, y: number, z: number}, angleX: number, angleY: number, angleZ: number) {
        let { x, y, z } = point;

        // Rotate X
        let cos = Math.cos(angleX);
        let sin = Math.sin(angleX);
        let ny = y * cos - z * sin;
        let nz = y * sin + z * cos;
        y = ny; z = nz;

        // Rotate Y
        cos = Math.cos(angleY);
        sin = Math.sin(angleY);
        let nx = x * cos + z * sin;
        nz = -x * sin + z * cos;
        x = nx; z = nz;

        // Rotate Z
        cos = Math.cos(angleZ);
        sin = Math.sin(angleZ);
        nx = x * cos - y * sin;
        ny = x * sin + y * cos;
        x = nx; y = ny;

        return { x, y, z };
    }

    // Helper to project 3D to 2D
    function project(point: {x: number, y: number, z: number}, width: number, height: number, scale: number) {
        // Simple perspective projection
        const perspective = 2;
        const factor = perspective / (perspective + point.z);
        return {
            x: point.x * factor * scale + width / 2,
            y: point.y * factor * scale + height / 2
        };
    }

	onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;

        function animate() {
            if (!canvas) return;

            // Resize canvas
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            const width = canvas.width;
            const height = canvas.height;
            const scale = Math.min(width, height) * 0.8;

            ctx.clearRect(0, 0, width, height);

            // Update time
            time += 0.01;

            // Calculate rotation angles
            const angleY = time * 0.5;
            const angleX = Math.sin(time * 0.3) * 0.2;
            const angleZ = Math.cos(time * 0.2) * 0.1;

            // Transform and draw
            const transformedPoints = BASE_HAND.map((p, i) => {
                // Animate fingers (curl)
                let mp = { ...p };

                // Simple procedural animation for fingers
                // Indices:
                // Thumb: 1-4
                // Index: 5-8
                // Middle: 9-12
                // Ring: 13-16
                // Pinky: 17-20

                if (i >= 5) { // Fingers (not thumb)
                    const fingerIndex = Math.floor((i - 5) / 4); // 0 to 3
                    const jointIndex = (i - 5) % 4; // 0 to 3

                    // Create a wave effect for curling
                    const curl = (Math.sin(time * 2 + fingerIndex) + 1) / 2; // 0 to 1

                    // Bend fingers inward (z direction and y direction)
                    if (jointIndex > 0) {
                        mp.z += curl * 0.1 * jointIndex;
                        mp.y += curl * 0.1 * jointIndex;
                    }
                }

                return rotatePoint(mp, angleX, angleY, angleZ);
            });

            const projectedPoints = transformedPoints.map(p => project(p, width, height, scale));

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)'; // Wired style green, low opacity
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (const [start, end] of CONNECTIONS) {
                const p1 = projectedPoints[start];
                const p2 = projectedPoints[end];
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();

            // Draw landmarks
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
            for (const p of projectedPoints) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        }

        animate();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			cancelAnimationFrame(animationId);
		}
	});
</script>

<canvas bind:this={canvas} class="fixed inset-0 z-0 h-full w-full pointer-events-none"></canvas>
