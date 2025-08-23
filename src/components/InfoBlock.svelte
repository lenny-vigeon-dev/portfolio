<script lang="ts">
    import "$/app.css"

    import {
        text_xl,
        text_md,
        text_sm,
        s } from "$utils/styles";
    import type { Snippet } from "svelte";


    interface InfoBlockProps {
        title: string;
        content: string;
        href?: string;
        tabindex?: number;
        svg: Snippet<[]>;
    }

    let {
        title,
        content,
        href,
        tabindex = 0,
        svg,
    }: InfoBlockProps = $props();

    import BlurryDiv from '$components/containers/BlurryDiv.svelte';

    const p6: string = s("p", 6);
    const h12: string = s("h", 12);
    const w12: string = s("w", 12);
    const space_x_4: string = s("space-x", 4);
    const mb4: string = s("mb", 1);

</script>
<BlurryDiv animate={false}>
    {#snippet main()}
	<div class={p6}>
		<div class={"flex items-center" + space_x_4}>
			<div class={"flex items-center justify-center" + h12 + w12}>
				{@render svg() }
			</div>
			<div>
				<h3 class={"font-semibold" + text_md + mb4}>{title}</h3>
                {#if href}
                    <a href={href} class={"hover:underline"} tabindex={tabindex}>
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
