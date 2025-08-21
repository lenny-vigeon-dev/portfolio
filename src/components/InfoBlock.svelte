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
        svg: Snippet<[]>;
    }

    let {
        title,
        content,
        svg
    }: InfoBlockProps = $props();

    import BlurryDiv from '$components/BlurryDiv.svelte';


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
				<p class={text_sm}>{content}</p>
			</div>
		</div>
	</div>
    {/snippet}
</BlurryDiv>
