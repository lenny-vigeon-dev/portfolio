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
    const FPS: number = 120;
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
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * (speed / FPS) * canvas.height,
            dy: (Math.random() - 0.5) * (speed / FPS) * canvas.height,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3,
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
            return
        }

        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Wrap around edges
            if (particle.x < -borderExtra) particle.x = canvas.width + borderExtra;
            if (particle.x > canvas.width + borderExtra) particle.x = -borderExtra;
            if (particle.y < -borderExtra) particle.y = canvas.height + borderExtra;
            if (particle.y > canvas.height + borderExtra) particle.y = -borderExtra;
        });

    }

    function drawParticles() {
        const clusterSize = maxDistance;

        if (lastTime + frameTime < performance.now()) {
            lastTime = performance.now();
        } else {
            return; // Skip frame if too soon
        }
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.lineWidth = 0.5 * particleScale;
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particleScale, 0, Math.PI * 2);
            ctx.fill();
        });

        // ctx.fillStyle = `rgba(0, 255, 0, 1)`;
        // ctx.beginPath();
        // ctx.arc(particles[0].x, particles[0].y, particles[0].size * particleScale, 0, Math.PI * 2);
        // ctx.fill();

        let particlesCluster: Particle[][][] = [];
        const w = Math.ceil(canvas.width / clusterSize);
        const h = Math.ceil(canvas.height / clusterSize);
        for (let i = 0; i < w; i++) {
            particlesCluster.push([]);
            for (let j = 0; j < h; j++)
                particlesCluster[i].push([]);
        }

        // console.log(particles[0].x + ", " + particles[0].y + " | " +
        //     Math.floor(particles[0].x / clusterSize) + "/" + w +
        //     " " + Math.floor(particles[0].y / clusterSize) + "/" + h);

        // Cluster particles
        particles.forEach(particle => {
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
                                const opacity = (1 - distance / maxDistance);
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
        connections.forEach(conn => {
            ctx.beginPath();
            ctx.moveTo(conn.x, conn.y);
            ctx.lineTo(conn.x2, conn.y2);
            if (prevOpacity !== conn.opacity) {
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${conn.opacity / opacityStep * 0.4})`;
            }
            ctx.stroke();
            prevOpacity = conn.opacity;
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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        horizontal_ratio = canvas.height ? canvas.width / canvas.height : 1;
        vertical_ratio = canvas.width ? canvas.height / canvas.width : 1;
        maxDistance = canvas.height / 9;
        particleScale = canvas.height / 500;
        borderExtra = canvas.height / 10;
        // console.log(`Resizing canvas to ${canvas.width}x${canvas.height} with ratios ${horizontal_ratio}, ${vertical_ratio}, particleScale: ${particleScale}, maxDistance: ${maxDistance}`);

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
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    // Theme changed, update colors
                    if (getStoredTheme()) {
                        r = 139;
                        g = 92;
                        b = 246;
                    } else {
                        r = 240;
                        g = 50;
                        b = 0;
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
    class="fixed inset-0 w-full h-full pointer-events-none z-0"
    style="background: transparent;"
></canvas>

<style>
    canvas {
        will-change: transform;
    }
</style>
