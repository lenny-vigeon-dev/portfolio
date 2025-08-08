<script lang="ts">
    import "$/app.css"
	import type { Snippet } from "svelte";
    import {
        primary_gradient,
        rounded_md,
        text_sm,
        svg_scale
    } from "$utils/styles";
	import { text } from "@sveltejs/kit";

    interface ThemeButtonProps {
        value?: any;
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

<div class={"flex relative group" + rounded_md + primary_gradient}>
    <select bind:value={value} onchange={handleChange} onmousedown={handleMouseDown} onkeydown={handleKeyDown}
    class={"appearance-none \
    m-0.25 2kp:m-0.5 2uhd:m-0.75 \
    pl-2 sm:pl-6 uhdp:pl-11 4kp:pl-16 2uhd:pl-20 \
    pr-5 sm:pr-10 uhdp:pr-18 4kp:pr-26 2uhd:pr-35 \
    py-2 uhdp:py-5 4kp:py-7 2uhd:py-9 \
    text-lcol2 dark:text-dcol3 \
    bg-lbg2 dark:bg-dbg2" +
    rounded_md + text_sm}>
        {@render main?.() }
    </select>

    <div class={"absolute pointer-events-none \
    right-1 sm:right-4 uhdp:right-7 4kp:right-11 2uhd:right-15 \
    top-1/2 transform -translate-y-1/2  \
    transition-transform duration-300 \
    group-hover:rotate-180 group-focus-within:rotate-180" +
    svg_scale}>
        <svg class="w-4 h-4 text-lcol2 dark:text-dcol3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
</div>
