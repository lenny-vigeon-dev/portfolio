<script lang="ts">
    import "$/app.css"

    import { s,
        text_sm,
        rounded_md
     } from "$utils/styles";
    import Label from "$components/Label.svelte";


    interface TextAreaProps {
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
    }: TextAreaProps = $props();

    const space_y1 = s("space-y", 1);
    const px3: string = s("px", 3);
    const py2: string = s("py", 2);

</script>


<div class={"flex flex-col" + space_y1}>
    <Label _for={id} title={title}/>
        <textarea class={"min-h-[120px] w-full \
        flex border duration-200 transition-all \
        dark:border-gray-300 border-gray-500 \
        hover:dark:border-dcol4 hover:border-lcol4 \
        focus-visible:ring focus-visible:outline-none \
        disabled:cursor-not-allowed disabled:opacity-50" +
        rounded_md + text_sm + px3 + py2}
        id={id} placeholder={placeHolder} tabindex={tabindex}></textarea>
</div>
