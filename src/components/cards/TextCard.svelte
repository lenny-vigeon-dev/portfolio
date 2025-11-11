<script lang="ts">
	import '$/app.css';

	import { h4_sizes, p_font_sizes_m, rounded_lg } from '$utils/styles';

	interface TextCardProps {
		title: string;
		content: string;
	}

	let { title, content }: TextCardProps = $props();
</script>

<div class={'bg-lbg5 p-[3%] dark:bg-dbg5' + rounded_lg}>
	<h4 class={'mb-2 font-semibold text-lt1 dark:text-dt1' + h4_sizes}>{title}</h4>
	<p class={p_font_sizes_m}>{content}</p>
</div>
