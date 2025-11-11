<script lang="ts">
	import { onMount } from 'svelte';

	import { getStoredTheme } from '$utils/themeManager';

	interface Particle {
		x: number;
		y: number;
		dx: number;
		dy: number;
		size: number;
		opacity: number;
	}

	interface Connections {
		x: number;
		y: number;
		x2: number;
		y2: number;
		opacity: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animationId: number;
	let mounted = false;
	let maxDistance: number = 100;
	let particleScale: number = 1;
	let lastTime: number = 0;

	// FPS counter variables
	const FPS: number = 30;
	const frameTime: number = 1000 / FPS; // Time per frame in milliseconds
	let horizontal_ratio: number = 1;
	let vertical_ratio: number = 1;
	const speed = 0.02;
	const opacityStep: number = 30;
	let r: number = 139;
	let g: number = 92;
	let b: number = 246;
	let borderExtra: number = 100;

	function createParticle(): Particle {
		const width = parseFloat(canvas.style.width) || canvas.width;
		const height = parseFloat(canvas.style.height) || canvas.height;
		return {
			x: Math.random() * width,
			y: Math.random() * height,
			dx: (Math.random() - 0.5) * (speed / FPS) * height,
			dy: (Math.random() - 0.5) * (speed / FPS) * height,
			size: Math.random() * 4 + 2,
			opacity: Math.random() * 0.5 + 0.3
		};
	}

	function initParticles() {
		const particleCount = Math.floor(200 * horizontal_ratio);
		// console.log(`Initializing ${particleCount} particles`);

		particles = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push(createParticle());
		}
	}

	function updateParticles() {
		if (lastTime + frameTime >= performance.now()) {
			return;
		}

		const width = parseFloat(canvas.style.width) || canvas.width;
		const height = parseFloat(canvas.style.height) || canvas.height;

		particles.forEach((particle) => {
			particle.x += particle.dx;
			particle.y += particle.dy;

			// Wrap around edges
			if (particle.x < -borderExtra) particle.x = width + borderExtra;
			if (particle.x > width + borderExtra) particle.x = -borderExtra;
			if (particle.y < -borderExtra) particle.y = height + borderExtra;
			if (particle.y > height + borderExtra) particle.y = -borderExtra;
		});
	}

	function drawParticles() {
		const clusterSize = maxDistance;

		if (FPS === 0 || lastTime + frameTime < performance.now()) {
			lastTime = performance.now();
		} else {
			return; // Skip frame if too soon
		}

		const width = parseFloat(canvas.style.width) || canvas.width;
		const height = parseFloat(canvas.style.height) || canvas.height;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Draw particles
		ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
		ctx.lineWidth = 0.5 * particleScale;
		particles.forEach((particle) => {
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size * particleScale, 0, Math.PI * 2);
			ctx.fill();
		});

		// ctx.fillStyle = `rgba(0, 255, 0, 1)`;
		// ctx.beginPath();
		// ctx.arc(particles[0].x, particles[0].y, particles[0].size * particleScale, 0, Math.PI * 2);
		// ctx.fill();

		let particlesCluster: Particle[][][] = [];
		const w = Math.ceil(width / clusterSize);
		const h = Math.ceil(height / clusterSize);
		for (let i = 0; i < w; i++) {
			particlesCluster.push([]);
			for (let j = 0; j < h; j++) particlesCluster[i].push([]);
		}

		// console.log(particles[0].x + ", " + particles[0].y + " | " +
		//     Math.floor(particles[0].x / clusterSize) + "/" + w +
		//     " " + Math.floor(particles[0].y / clusterSize) + "/" + h);

		// Cluster particles
		particles.forEach((particle) => {
			const xIndex = Math.max(0, Math.min(Math.floor(particle.x / clusterSize), w - 1));
			const yIndex = Math.max(0, Math.min(Math.floor(particle.y / clusterSize), h - 1));
			particlesCluster[xIndex][yIndex].push(particle);
		});

		let check: number = 0;
		let connections: Connections[] = [];
		for (let x = 0; x < w; x++) {
			for (let y = 0; y < h; y++) {
				const cluster = particlesCluster[x][y];
				if (cluster.length === 0) continue;

				let clusterList: number[][] = [[x, y]];
				if (x > 0) {
					clusterList.push([x - 1, y]);
					if (y > 0) clusterList.push([x - 1, y - 1]);
					if (y < h - 1) clusterList.push([x - 1, y + 1]);
				}
				if (x < w - 1) {
					clusterList.push([x + 1, y]);
					if (y > 0) clusterList.push([x + 1, y - 1]);
					if (y < h - 1) clusterList.push([x + 1, y + 1]);
				}
				if (y > 0) clusterList.push([x, y - 1]);
				if (y < h - 1) clusterList.push([x, y + 1]);

				for (const p of cluster) {
					for (const [cx, cy] of clusterList) {
						const subCluster = particlesCluster[cx][cy];
						if (subCluster.length === 0) continue;
						for (const p2 of subCluster) {
							const dx = p.x - p2.x;
							const dy = p.y - p2.y;
							const distance = Math.sqrt(dx * dx + dy * dy);

							if (distance < maxDistance && distance > 0) {
								const opacity = 1 - distance / maxDistance;
								connections.push({
									x: p.x,
									y: p.y,
									x2: p2.x,
									y2: p2.y,
									opacity: Math.floor(opacity * opacityStep)
								});
							}
							check++;
						}
					}
				}
			}
		}

	let prevOpacity = 0;
	connections.sort((a, b) => b.opacity - a.opacity);
	connections.forEach((conn) => {
		ctx.beginPath();
		ctx.moveTo(conn.x, conn.y);
		ctx.lineTo(conn.x2, conn.y2);
		if (prevOpacity !== conn.opacity) {
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(conn.opacity / opacityStep) * 0.4})`;
		}
		ctx.stroke();
		prevOpacity = conn.opacity;
	});

		// Calculate average opacity for each particle
		const particleConnections = new Map<Particle, number[]>();
		particles.forEach((particle) => {
			particleConnections.set(particle, []);
		});

		connections.forEach((conn) => {
			// Find particles that match the connection endpoints
			particles.forEach((particle) => {
				if (particle.x === conn.x && particle.y === conn.y) {
					particleConnections.get(particle)?.push(conn.opacity);
				}
				if (particle.x === conn.x2 && particle.y === conn.y2) {
					particleConnections.get(particle)?.push(conn.opacity);
				}
			});
		});

		// Draw average opacity on each particle
		particles.forEach((particle) => {
			const opacities = particleConnections.get(particle) || [];
			if (opacities.length > 0) {
				const avgOpacity = opacities.reduce((sum, op) => sum + op, 0) / opacities.length;
				const displayValue = ((avgOpacity / opacityStep) * 0.4).toFixed(2);

				ctx.fillStyle = `rgba(128,128,128, 0.6)`;
				ctx.font = `${particle.size * 0.8 * particleScale}px sans-serif`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(displayValue, particle.x, particle.y);
			}
		});

		// console.log(`Frame drawn in ${performance.now() - lastTime}ms | ${check}`);
	}

	function animate() {
		if (!mounted) return;
		updateParticles();
		drawParticles();
		animationId = requestAnimationFrame(animate);
	}

	function resizeCanvas() {
		if (!canvas) return;
		// Use document.documentElement for more reliable viewport size
		const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
		const height = Math.min(window.innerHeight, document.documentElement.clientHeight);

		// Get device pixel ratio for sharp rendering at any zoom level
		const dpr = window.devicePixelRatio || 1;

		// Set display size (css pixels)
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		// Set actual size in memory (scaled to account for extra pixel density)
		canvas.width = width * dpr;
		canvas.height = height * dpr;

		// Scale all drawing operations by the dpr
		ctx.scale(dpr, dpr);

		// Use CSS dimensions for calculations
		horizontal_ratio = height ? width / height : 1;
		vertical_ratio = width ? height / width : 1;
		maxDistance = height / 9;
		particleScale = height / 500;
		borderExtra = height / 10;
		// console.log(`Resizing canvas to ${canvas.width}x${canvas.height} (${width}x${height} CSS) with dpr ${dpr}, ratios ${horizontal_ratio}, ${vertical_ratio}, particleScale: ${particleScale}, maxDistance: ${maxDistance}`);

		initParticles();
	}

	onMount(() => {
		mounted = true;
		ctx = canvas.getContext('2d')!;
		resizeCanvas();
		animate();

		const handleResize = () => resizeCanvas();
		window.addEventListener('resize', handleResize);

		// Observer for theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					// Theme changed, update colors
					if (getStoredTheme()) {
						r = 139;
						g = 92;
						b = 246;
					} else {
						r = 255;
						g = 150;
						b = 100;
					}
				}
			});
		});

		// Observe class changes on html element (where dark class is toggled)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => {
			mounted = false;
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			window.removeEventListener('resize', handleResize);
			observer.disconnect(); // Don't forget to disconnect observer
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0 h-full w-full max-w-full"
	style="background: transparent; max-width: 100vw; max-height: 100vh;"
></canvas>

<style>
	canvas {
		will-change: transform;
		overflow: hidden;
	}
</style>
