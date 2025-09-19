<script lang="ts">
    import type { DefaultProps } from "$utils/interfaces";


    let { _style = "", _class = "", size = 20 }: DefaultProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
class={_class} style={_style}>
    <!-- Document with folded corner -->
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
    <path d="M14 3v5h5" />

    <!-- Contract text lines -->
    <path d="M8 11h8" />
    <path d="M8 14h6" />
</svg>
