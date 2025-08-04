<script lang="ts">
    import { onMount } from 'svelte';

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



    function createParticle(): Particle {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    function initParticles() {
        const particleCount = 0.00008 * (canvas.width * canvas.height);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }

    function drawParticles(particle_r: number = 139, particle_g: number = 92, particle_b: number = 246) {
        const maxDistance = 200;
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particle_r}, ${particle_g}, ${particle_b}, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 1;
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
        initParticles();
    }

    onMount(() => {
        mounted = true;
        ctx = canvas.getContext('2d')!;
        resizeCanvas();
        animate();

        const handleResize = () => resizeCanvas();
        window.addEventListener('resize', handleResize);

        return () => {
            mounted = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', handleResize);
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
