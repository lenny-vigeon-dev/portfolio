<script lang="ts">
    import "$/app.css";
    import {
        primary_gradient,
        rounded_md,
        text_sm,
        gradient_div_parent,
        gradient_div_child,
        s
    } from "$utils/styles";

    interface ButtonProps {
        text: string;
        onclick?: () => void;
        href?: string;
        target?: string;
        main?: any;
        tabindex?: number;
    }

    let { text, onclick, href, target, main, tabindex = 0 }: ButtonProps = $props();

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

    const parentStyle: string = gradient_div_parent + rounded_md;
    const divStyle: string = "px-2 sm:px-5 uhdp:px-8 4kp:px-12 2uhd:px-15 \
        py-2 uhdp:py-5 4kp:py-7 2uhd:py-9" +
        gradient_div_child + rounded_md + text_sm + s("gap", 4);
</script>

{#if href}
    <a {href} {target} class={parentStyle} tabindex={tabindex}>
        <div class={divStyle}>
            {@render main?.()}
            {text}
        </div>
    </a>
{:else}
    <button class={parentStyle} onclick={handleClick} tabindex={tabindex}>
        <div class={divStyle}>
            {@render main?.()}
            {text}
        </div>
    </button>
{/if}
