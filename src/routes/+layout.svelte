<script lang="ts">
	import '$/app.css';

	// Types explicites pour les props
	interface LayoutProps {
		children: import('svelte').Snippet;
	}

	let { children }: LayoutProps = $props();
</script>

{@render children()}
