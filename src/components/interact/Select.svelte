<script lang="ts">
	import '$/app.css';
	import type { Snippet } from 'svelte';
	import {
		primary_gradient,
		rounded_md,
		text_sm,
		svg_scale,
		gradient_div_parent
	} from '$utils/styles';

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
</script>

<div class={'relative flex ' + gradient_div_parent + rounded_md}>
	<select
		bind:value
		onchange={handleChange}
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
		class={'appearance-none ' +
			'm-0.25 2kp:m-0.5 2uhd:m-0.75 ' +
			'text-lcol2 dark:text-dcol3 ' +
			'bg-lbg2 dark:bg-dbg2 ' +
			rounded_md +
			' ' +
			text_sm +
			' py-2 pr-6 pl-3'}
		{tabindex}
	>
		{@render main?.()}
	</select>

	<div
		class={'pointer-events-none absolute ' +
			'top-1/2 -translate-y-1/2 transform  ' +
			'transition-transform duration-300 ' +
			'right-1.5 group-focus-within:rotate-180 group-hover:rotate-180'}
	>
		<svg
			class="h-4 w-4 text-lcol2 dark:text-dcol3"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</div>
</div>
