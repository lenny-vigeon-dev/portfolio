<script lang="ts">
	import '$/app.css';
	import {
		primary_gradient,
		rounded_md,
		text_sm,
		gradient_div_parent,
		gradient_div_child
	} from '$utils/styles';
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		text: string;
		onclick?: () => void;
		href?: string;
		target?: string;
		main?: Snippet<[]>;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		tabindex?: number;
	}

	let {
		text,
		onclick,
		href,
		target,
		main,
		type = 'button',
		disabled = false,
		tabindex = 0
	}: ButtonProps = $props();

	// Handle click to remove focus after clicking
	function handleClick(event: MouseEvent) {
		if (disabled) {
			return;
		}
		if (onclick) {
			onclick();
		}
		// Only remove focus for mouse clicks, not keyboard navigation
		if (event.detail !== 0) {
			(event.currentTarget as HTMLButtonElement).blur();
		}
	}

	const parentStyle: string = gradient_div_parent + rounded_md;
	const divStyle: string = gradient_div_child + rounded_md + ' ' + text_sm + ' gap-4 px-2 py-2';
</script>

{#if href}
	<a {href} {target} class={parentStyle} {tabindex}>
		<div class={divStyle}>
			{@render main?.()}
			{text}
		</div>
	</a>
{:else}
	<button
		class={parentStyle}
		{type}
		{disabled}
		onclick={handleClick}
		{tabindex}
		aria-busy={disabled ? 'true' : undefined}
	>
		<div class={divStyle}>
			{@render main?.()}
			{text}
		</div>
	</button>
{/if}
