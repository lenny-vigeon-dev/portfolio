<script lang="ts">
    import "$/app.css"

    import {
        animated500,
        h4_sizes,
        p_font_sizes2,
    } from "$utils/styles";

    interface TextCardProps {
        title: string;
        content: string;
    }

    let { title, content }: TextCardProps = $props();

</script>

<div class="rounded-lg p-6 bg-lbg5 dark:bg-dbg5">
    <h4 class={h4_sizes + animated500 + "font-semibold mb-2 text-lt1 dark:text-dt1"}>{title}</h4>
    <p class={p_font_sizes2 + animated500 + ""}>{content}</p>
</div>
