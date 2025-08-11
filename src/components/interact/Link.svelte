<script lang="ts">
    import "$/app.css"

    import {
        s,
        svg_scale
    } from "$utils/styles";

    import Url from "../logos/Url.svelte";

    const gap2: string = s("gap", 2);

    interface LinkProps {
        title: string;
        url: string;
        target?: string;
        tabindex?: number;
        _class?: string;
    }

    let {
        title,
        url,
        target = "_blank",
        tabindex = 0,
        _class = ""
    }: LinkProps = $props();

</script>

<a href={url} target={target} tabindex={tabindex}
class={"flex flex-row items-center inline-center \
text-lt3 dark:text-dt3 hover:underline" +
gap2 + _class}>
    <p>{title}</p>
    <Url size={16} _class={svg_scale} />
</a>
