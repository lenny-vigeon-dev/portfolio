<script lang="ts">
    import "$/app.css";
    import {
        primary_gradient,
        rounded_md,
        text_sm,
        gap4
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

    const parentStyle: string = "flex group" + rounded_md + primary_gradient;
    const divStyle: string = "flex-3  \
        m-0.25 2kp:m-0.5 2uhd:m-0.75 \
        px-2 sm:px-5 uhdp:px-8 4kp:px-12 2uhd:px-15 \
        py-2 uhdp:py-5 4kp:py-7 2uhd:py-9 \
        inline-flex items-center \
        hover:bg-transparent group-focus-within:bg-transparent \
        bg-lbg2 dark:bg-dbg2 active:bg-lbg2/30 dark:active:bg-dbg2/30 \
        dark:hover:text-dt2 hover:text-lt2 \
        group-focus-within:dark:text-dt2 group-focus-within:text-lt2 \
        text-lcol2 dark:text-dcol3 \
        transition-all duration-300" +
        rounded_md + text_sm + gap4;
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
