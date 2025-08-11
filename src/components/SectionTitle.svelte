<script lang="ts">
    // Add scroll listener on mount
    import { onMount } from 'svelte';
	import '$/app.css';

	import {
		colored_title,
		h1_sizes,
		p_font_sizes_l,
		p_width2,
        s
	} from '$utils/styles';

    interface SectionTitleProps {
        title: string;
        subtitle: string;
    }

    const mb16: string = s("mb", 16);

    let { title, subtitle } = $props();
</script>

<div class={"text-center " + mb16}>
    <h2 class={colored_title + h1_sizes}>{title}</h2>
    <p class={"mx-auto" + p_width2 + p_font_sizes_l}>{subtitle}</p>
</div>
