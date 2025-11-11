<script lang="ts">
	import '$/app.css';
	import type { Snippet } from 'svelte';

	interface GridProps {
		main?: Snippet<[]>;
		gap?: number;
		toRight?: boolean;
		_class?: string;
	}

	let { main, gap = 6, toRight = false, _class = '' }: GridProps = $props();

	// Map gap number to Tailwind class
	const gapClass = `gap-${gap}`;
</script>

<div
	class={'grid grid-cols-1 lg:grid-cols-2 ' + gapClass + ' ' + _class}
	style={toRight ? 'direction: rtl;' : ''}
>
	{@render main?.()}
</div>
