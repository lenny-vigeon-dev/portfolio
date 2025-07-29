<script lang="ts">
    import {
        colored_title,
        animated500,
        h1_sizes,
        p_font_sizes,
        p_width
    } from "$utils/styles";
    import JumpingMouse from "$components/JumpingMouse.svelte";
    import Button from "$components/Button.svelte";
    import Email from "$components/logos/Email.svelte";
    import "$/app.css"

    // Import des composants d'icônes
    import Download from "$components/logos/Download.svelte";
	import { onMount } from "svelte";
    // Si vous avez un composant Email, importez-le aussi
    // import Email from "$components/logos/Email.svelte";

  let darkMode = $state(true);

onMount(() => {

    const html = document.documentElement;
    $effect(() => {
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    });
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
});

</script>


<section class={"transition-colors duration-300 min-h-screen relative flex items-center justify-center overflow-hidden bg-lbg dark:bg-dbg text-ltext dark:text-dtext "}>
    <!-- <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style=""></div> -->
    <!-- <div class="absolute inset-0 bg-gradient-hero"></div> -->
    <div class="absolute inset-0">
        <!-- <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div> -->
        <!-- <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div> -->
        <Button text={darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'} onclick={() => darkMode = !darkMode} />
    </div>
    <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class={colored_title + h1_sizes + animated500}>Fullstack + AI Developer</h1>
        <div class="max-w-4xl mx-auto">
            <p class={p_font_sizes + animated500 + p_width + "mb-8 mx-auto "}>Building intelligent applications that bridge the gap between cutting-edge AI and scalable web technologies</p>
            <div class="flex flex-wrap justify-center gap-4 mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
                <Button text="Get in touch" logo={Email} />
                <Button text="Download CV" logo={Download} />
            </div>
            <div class="flex justify-center gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github w-6 h-6">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                </button>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin w-6 h-6">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <JumpingMouse />
</section>
