<script lang="ts">
    import "$/app.css"

    import type { Snippet } from "svelte"

    import { s,
        text_sm
     } from "$utils/styles";

    interface LabelProps {
        title: string;
        _for: string
        main?: Snippet<[]>
    }

    let {
        title,
        _for,
        main
    }: LabelProps = $props();

    const space_y1 = s("space-y", 1);

</script>

<div class={"flex flex-col" + space_y1}>
	<label class={"font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" +
    text_sm} for={_for}>{title}</label>
    {@render main?.()}
</div>
