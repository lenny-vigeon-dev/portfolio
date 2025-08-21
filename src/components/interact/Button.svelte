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
    import type { Snippet } from "svelte";

    interface ButtonProps {
        text: string;
        onclick?: () => void;
        href?: string;
        target?: string;
        main?: Snippet<[]>;
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
    const divStyle: string = gradient_div_child + rounded_md + text_sm +
        s("gap", 4) + s("px", 2) + s("py", 2);
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
