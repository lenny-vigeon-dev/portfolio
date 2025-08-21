<script lang="ts">
    import "$/app.css";

    interface ButtonProps {
        onclick?: () => void;
        href?: string;
        target?: string;
        main?: any;
        _class?: string;
        tabindex?: number;
    }

    let { onclick, href, target, main, _class = "", tabindex = 0 }: ButtonProps = $props();

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
    transition-all duration-100" + _class;

    // 2kp:scale-150 2kp:hover:scale-165 2kp:active:scale-155 2kp:focus:scale-165 \
    // uhdp:scale-200 uhdp:hover:scale-220 uhdp:active:scale-210 uhdp:focus:scale-220 \
    // 4kp:scale-250 4kp:hover:scale-275 4kp:active:scale-265 4kp:focus:scale-275 \
    // 2uhd:scale-300 2uhd:hover:scale-335 2uhd:active:scale-325 2uhd:focus:scale-335 \

</script>

{#if href}
    <a {href} {target} class={parentStyle} tabindex={tabindex}>
        {@render main?.()}
    </a>
{:else}
    <button class={parentStyle} onclick={handleClick} tabindex={tabindex}>
        {@render main?.()}
    </button>
{/if}
