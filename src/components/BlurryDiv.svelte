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
    transition-all duration-300 \
    hover:-translate-y-2 2kp:hover:-translate-y-4 uhdp:hover:-translate-y-6 4kp:hover:-translate-y-8 2uhd:hover:-translate-y-10"}
>
    {@render main?.() }
</div>
