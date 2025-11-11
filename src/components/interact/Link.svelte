<script lang="ts">
	import '$/app.css';

	import { onMount } from 'svelte';

	import Url from '../icons/Url.svelte';

	let iconSize: number = $state(16);

	interface LinkProps {
		title: string;
		url: string;
		target?: string;
		tabindex?: number;
		_class?: string;
	}

	let { title, url, target = '_blank', tabindex = 0, _class = '' }: LinkProps = $props();

	function resizeDependentFunctions() {
		// Update icon size on resize
		// These values are now static - consider using CSS for responsive sizing
		iconSize = 16;
	}

	onMount(() => {
		resizeDependentFunctions();
		window.addEventListener('resize', resizeDependentFunctions);
		return () => {
			window.removeEventListener('resize', resizeDependentFunctions);
		};
	});
</script>

<a
	href={url}
	{target}
	{tabindex}
	class={'inline-center flex flex-row items-center ' +
		'gap-2 text-lt3 hover:underline dark:text-dt3 ' +
		_class}
>
	<p>{title}</p>
	<Url size={iconSize} />
</a>
