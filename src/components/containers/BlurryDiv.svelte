<script lang="ts">
	import '$/app.css';
	import { rounded_lg } from '$utils/styles';
	import type { Snippet } from 'svelte';

	interface BlurryDivProps {
		main?: Snippet<[]>;
		animate?: boolean;
	}
	let { main, animate = false }: BlurryDivProps = $props();

	const translate_y = animate
		? 'hover:-translate-y-2 2kp:hover:-translate-y-4 uhdp:hover:-translate-y-6 4kp:hover:-translate-y-8 2uhd:hover:-translate-y-10'
		: '';
</script>

<div
	class={'group border-1 backdrop-blur ' +
		'transition-all duration-300 ' +
		'border-black/20 dark:border-white/20 ' +
		// 'hover:dark:border-dcol2/50 hover:border-lcol1/50 ' +
		translate_y +
		rounded_lg}
>
	{@render main?.()}
</div>
