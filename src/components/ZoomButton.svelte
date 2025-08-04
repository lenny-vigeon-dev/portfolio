<script lang="ts">
    import "$/app.css";

    interface ButtonProps {
        onclick?: () => void;
        href?: string;
        target?: string;
        main?: any;
        _class?: string;
    }

    let { onclick, href, target, main, _class = "" }: ButtonProps = $props();

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
    const parentStyle: string = "inline-flex items-center justify-center \
    hover:scale-115 active:scale-105 focus:scale-115 \
    transition-all duration-100";
</script>

{#if href}
    <a {href} {target} class={parentStyle}>
        {@render main?.()}
    </a>
{:else}
    <button class={parentStyle} onclick={handleClick}>
        {@render main?.()}
    </button>
{/if}
