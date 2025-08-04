<script lang="ts">
    import "$/app.css"
	import type { Snippet } from "svelte";
    import {
        primary_gradient,
    } from "$utils/styles";

    interface ThemeButtonProps {
        value: any;
        onchange?: (event: Event) => void;
        main: any;
    }
    let { value = $bindable(), onchange, main }: ThemeButtonProps = $props();

    let isMouseInteraction = $state(false);

    // Handle change to call callback and remove focus after selection
    function handleChange(event: Event & { currentTarget: HTMLSelectElement }) {
        if (onchange) {
            onchange(event);
        }
        // Only remove focus for mouse interactions, not keyboard navigation
        if (isMouseInteraction) {
            event.currentTarget.blur();
            isMouseInteraction = false;
        }
    }

    function handleMouseDown() {
        isMouseInteraction = true;
    }

    function handleKeyDown() {
        isMouseInteraction = false;
    }

</script>

<div class={primary_gradient + "rounded-md flex relative group"}>
    <select bind:value={value} onchange={handleChange} onmousedown={handleMouseDown} onkeydown={handleKeyDown}
    class={"rounded-md py-2 pl-6 pr-10 m-0.25 appearance-none \
    text-sm text-lcol2 dark:text-dcol3 \
    bg-lbg2 dark:bg-dbg2"}>
        {@render main?.() }
    </select>

    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none
                transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
        <svg class="w-4 h-4 text-lcol2 dark:text-dcol3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
</div>
