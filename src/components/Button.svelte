<script lang="ts">
    import "$/app.css";
    import type { Component } from 'svelte';
    import {
        colored_title,
        primary_gradient,
        primary_gradient_border
    } from "$utils/styles";

    interface ButtonProps {
        text: string;
        logo?: Component;
        onclick?: () => void;
    }

    let { text, logo, onclick }: ButtonProps = $props(); // Destructuration correcte
    const Logo: Component | undefined = logo; // Utilisation de la variable destructurée
</script>

<button class={primary_gradient + " rounded-md"} {onclick}>
    <div class={"m-0.5 gap-2 h-10 px-6 \
    inline-flex items-center rounded-md \
    bg-lbg2 dark:bg-dbg2 hover:bg-transparent active:lbg2/70 dark:active:bg-dbg2/30 \
    text-sm text-purple-600 dark:hover:text-dtextr hover:text-ltextr \
    transition-all duration-300"}>
        {#if Logo}
            <Logo />
        {/if}
        {text}
    </div>
</button>
