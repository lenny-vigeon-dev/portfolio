<script lang="ts">
    import type { DefaultProps } from "$utils/interfaces";


    let { _style = "", _class = "", size = 20 }: DefaultProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
class={_class} style={_style}>
    <!-- Screen -->
    <rect x="3" y="4" width="18" height="12" rx="2" />

    <!-- Base -->
    <path d="M2 20h20" />
</svg>
