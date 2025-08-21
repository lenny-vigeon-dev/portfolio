<script lang="ts">
    import "$/app.css"
	import type { Snippet } from "svelte";
    import {
        primary_gradient,
        rounded_md,
        text_sm,
        svg_scale,
        gradient_div_parent,
        s
    } from "$utils/styles";

    interface SelectProps {
        value?: any;
        onchange?: (event: Event) => void;
        main: Snippet<[]>;
        tabindex?: number;
    }
    let { value = $bindable(), onchange, main, tabindex = 0 }: SelectProps = $props();

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

    const pl2: string = s("pl", 3);
    const pr5: string = s("pr", 6);
    const py2: string = s("py", 2);
    const right: string = s("right", 1.5);
    const w4: string = s("w", 4);
    const h4: string = s("h", 4);

</script>

<div class={"flex relative" + gradient_div_parent + rounded_md}>
    <select bind:value={value} onchange={handleChange} onmousedown={handleMouseDown} onkeydown={handleKeyDown}
    class={"appearance-none \
    m-0.25 2kp:m-0.5 2uhd:m-0.75 \
    text-lcol2 dark:text-dcol3 \
    bg-lbg2 dark:bg-dbg2" +
    rounded_md + text_sm + pl2 + pr5 + py2}
    tabindex={tabindex}>
        {@render main?.() }
    </select>

    <div class={"absolute pointer-events-none \
    top-1/2 transform -translate-y-1/2  \
    transition-transform duration-300 \
    group-hover:rotate-180 group-focus-within:rotate-180" + right}>
        <svg class={"text-lcol2 dark:text-dcol3" + w4 + h4} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
</div>
