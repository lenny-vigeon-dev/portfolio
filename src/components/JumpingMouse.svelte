<script lang="ts">
  import "$/app.css";
  import { primary_gradient,
    svg_scale,
    mb20
    } from '$utils/styles';

    import type { DefaultProps } from "$utils/interfaces";

  let { _class = "", _style = "" }: DefaultProps = $props();
</script>

<div class={"animate-bounce flex items-center justify-center " + mb20 + svg_scale + _class} style={_style}>
    <div class={"w-6 h-10 border-2 \
    rounded-full flex justify-center border-lcol1 dark:border-dcol1"}>
        <div class={primary_gradient + "w-1 h-3 rounded-full mt-2 animate-pulse"}></div>
    </div>
</div>
