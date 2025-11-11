<script lang="ts">
	import '$/app.css';
	import { onMount } from 'svelte';
	import { primary_gradient, svg_scale } from '$utils/styles';

	import type { DefaultProps } from '$utils/interfaces';

	let { _class = '', _style = '' }: DefaultProps = $props();
</script>

<div class={'flex animate-bounce items-center justify-center ' + _class} style={_style}>
	<div class="flex h-10 w-6 justify-center rounded-full border-2 border-lcol1 dark:border-dcol1">
		<div class={'animate-pulse rounded-full' + primary_gradient + ' mt-2 h-3 w-1'}></div>
	</div>
</div>
