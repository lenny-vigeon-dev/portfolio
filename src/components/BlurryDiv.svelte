<script lang="ts">
    import "$/app.css"
    import { rounded_lg } from '$utils/styles';

    interface BlurryDivProps {
        main?: any;
    }
    let { main }: BlurryDivProps = $props();
</script>

<div
    class={rounded_lg + "group backdrop-blur \
    border-1 dark:border-white/20 border-black/20 \
    hover:dark:border-dcol2/50 hover:border-lcol1/50 \
    transition-all duration-300 hover:-translate-y-2"}
>
    {@render main?.() }
</div>
