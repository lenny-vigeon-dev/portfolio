<script lang="ts">
	import '$/app.css';

	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import { headerVisible, sections } from '$lib/stores/ui';

	// Types explicites pour les props
	interface LayoutProps {
		children: import('svelte').Snippet;
	}

	let { children }: LayoutProps = $props();
</script>

<div class={"bg-lbg text-lt3 dark:bg-dbg dark:text-dt3 \
transition-colors duration-300 overflow-auto"}>
	<Header show={$headerVisible} sections={$sections} />
	{@render children()}
	<Footer />
</div>
