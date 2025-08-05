<script lang="ts">
    import "$/app.css";
    import type { Component } from 'svelte';
    import {
        primary_gradient,
    } from "$utils/styles";

    interface ButtonProps {
        text: string;
        onclick?: () => void;
        href?: string;
        target?: string;
        main?: any;
    }

    let { text, onclick, href, target, main }: ButtonProps = $props();

    // Handle click to remove focus after clicking
    function handleClick(event: MouseEvent) {
        if (onclick) {
            onclick();
        }
        // Only remove focus for mouse clicks, not keyboard navigation
        if (event.detail !== 0) {
            (event.currentTarget as HTMLButtonElement).blur();
        }
    }

    const parentStyle: string = primary_gradient + " rounded-md flex group";
    const divStyle: string = "m-0.25 gap-4 flex-3 px-5 py-2 \
        inline-flex items-center rounded-md \
        hover:bg-transparent group-focus-within:bg-transparent \
        bg-lbg2 dark:bg-dbg2 active:bg-lbg2/30 dark:active:bg-dbg2/30 \
        dark:hover:text-dt2 hover:text-lt2 \
        group-focus-within:dark:text-dt2 group-focus-within:text-lt2 \
        text-sm text-lcol2 dark:text-dcol3 \
        transition-all duration-300";
</script>

{#if href}
    <a {href} {target} class={parentStyle}>
        <div class={divStyle}>
            {@render main?.()}
            {text}
        </div>
    </a>
{:else}
    <button class={parentStyle} onclick={handleClick}>
        <div class={divStyle}>
            {@render main?.()}
            {text}
        </div>
    </button>
{/if}
