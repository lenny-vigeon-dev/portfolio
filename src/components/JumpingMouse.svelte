<script lang="ts">
    import "$/app.css";
    import { onMount } from 'svelte';
    import { primary_gradient,
        svg_scale,
        ws,
        s
    } from '$utils/styles';

    import type { DefaultProps } from "$utils/interfaces";

    let { _class = "", _style = "" }: DefaultProps = $props();

    const w1: string = s("w", 1);
    const w6: string = s("w", 6);
    const h3: string = s("h", 3);
    const h10: string = s("h", 10);
    const mt2: string = s("mt", 2);
    const border2: string = s("border", 2);
</script>

<div class={"animate-bounce flex items-center justify-center " + _class} style={_style}>
    <div class={"rounded-full flex justify-center border-lcol1 dark:border-dcol1" +
    w6 + h10 + border2}>
        <div class={"rounded-full animate-pulse" + primary_gradient + w1 + h3 + mt2}></div>
    </div>
</div>
