<script lang="ts">
	// Add scroll listener on mount
	import { onMount } from 'svelte';
	import '$/app.css';

	import { colored_title, h1_sizes, p_font_sizes_l, p_width2 } from '$utils/styles';

	interface SectionTitleProps {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle }: SectionTitleProps = $props();
</script>

<div class="mb-16 text-center">
	<h2 class={colored_title + h1_sizes}>{title}</h2>
	{#if subtitle}
		<p class={'mx-auto' + p_width2 + p_font_sizes_l}>{subtitle}</p>
	{/if}
</div>
