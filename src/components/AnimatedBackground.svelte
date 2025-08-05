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
    const speed = 2;
    let r: number = 139;
    let g: number = 92;
    let b: number = 246;

    function createParticle(): Particle {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * speed,
            dy: (Math.random() - 0.5) * speed,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    function initParticles() {
        const particleCount = Math.floor(250 * horizontal_ratio);
        // console.log(`Initializing ${particleCount} particles`);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        const borderExtra: number = 100;

        if (lastTime + frameTime >= performance.now()) {
            return
        }

        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Wrap around edges
            if (particle.x < -borderExtra) particle.x = canvas.width;
            if (particle.x > canvas.width + borderExtra) particle.x = 0;
            if (particle.y < -borderExtra) particle.y = canvas.height;
            if (particle.y > canvas.height + borderExtra) particle.y = 0;
        });

    }

    function drawParticles() {

        if (lastTime + frameTime < performance.now()) {
            lastTime = performance.now();
        } else {
            return; // Skip frame if too soon
        }
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particleScale, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw connections
        ctx.lineWidth = 0.5 * particleScale;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.stroke();
                }
            }
        }

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
