<script lang="ts">
	import '$/app.css';

	import { text_sm, p_font_sizes_s, gradient_div_parent, gradient_div_child } from '$utils/styles';

	interface SkillTagsProps {
		skills: string[];
	}

	let { skills }: SkillTagsProps = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each skills as skill}
		<div class={gradient_div_parent + 'rounded-full transition-all duration-300'}>
			<div class={'rounded-full' + gradient_div_child}>
				<div
					class={text_sm +
						'inline-flex cursor-default items-center ' +
						'px-2.5 pt-0.5 pb-1 ' +
						'4kp:px-8 4kp:pt-3 4kp:pb-5 ' +
						'text-lt1 hover:text-lt2 dark:text-dt1 hover:dark:text-dt2 ' +
						'transition-all duration-300'}
				>
					{skill}
				</div>
			</div>
		</div>
	{/each}
</div>
