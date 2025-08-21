<script lang="ts">
    import "$/app.css"

    import { s,
        text_sm,
        text_base,
        text_md,
        rounded_md
     } from "$utils/styles";
     import Label from "$components/Label.svelte";

    interface InputProps {
        title: string;
        placeHolder: string;
        id: string;
        tabindex?: number;
    }

    let {
        title,
        placeHolder,
        id,
        tabindex = 0
    }: InputProps = $props();

    const space_y1 = s("space-y", 1);
    const h10: string = s("h", 10);
    const px3: string = s("px", 3);
    const py2: string = s("py", 2);

</script>

<div class={space_y1}>
	<Label _for={id} title={title}/>
    <input
        class={"border-input ring-offset-background \
        focus-visible:ring-ring flex w-full rounded-md border \
        file:border-0 file:bg-transparent file:text-sm file:font-medium \
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none \
        disabled:cursor-not-allowed disabled:opacity-50" +
        h10 + px3 + py2 + rounded_md + text_sm}
        id={id}
        placeholder={placeHolder}
        tabindex={tabindex} />
</div>
