<script lang="ts">
    import "$/app.css"
    import { s } from '$utils/styles';
    import type { Snippet } from "svelte";

    interface GridProps {
        main?: Snippet<[]>;
        gap?: number;
        toRight?: boolean;
        _class?: string;
    }

    let { main, gap = 6, toRight = false, _class = "" }: GridProps = $props();

    const _gap: string = s("gap", gap);
</script>

<div class={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" + _gap + _class}
style={toRight ? "direction: rtl;" : ""}>
    {@render main?.() }
</div>
