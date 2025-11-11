<script lang="ts">
	import '$/app.css';

	import { text_xl, text_md, text_sm } from '$utils/styles';
	import type { Snippet } from 'svelte';

	interface InfoBlockProps {
		title: string;
		content: string;
		href?: string;
		tabindex?: number;
		svg: Snippet<[]>;
	}

	let { title, content, href, tabindex = 0, svg }: InfoBlockProps = $props();

	import BlurryDiv from '$components/containers/BlurryDiv.svelte';
</script>

<BlurryDiv animate={false}>
	{#snippet main()}
		<div class="p-6">
			<div class="flex items-center space-x-4">
				<div class="flex h-12 w-12 items-center justify-center">
					{@render svg()}
				</div>
				<div>
					<h3 class={'font-semibold' + text_md + ' mb-1'}>{title}</h3>
					{#if href}
						<a {href} class={'hover:underline'} {tabindex}>
							{content}
						</a>
					{:else}
						<p class={text_sm}>{content}</p>
					{/if}
				</div>
			</div>
		</div>
	{/snippet}
</BlurryDiv>
