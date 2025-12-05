<script lang="ts">
	import '$/app.css';

	import { primary_gradient, h3_sizes_lg, h3_sizes, text_xs, text_sm } from '$utils/styles';
	import { onMount } from 'svelte';
	import type { Collaborator } from '$utils/interfaces';

	import BlurryDiv from '$components/containers/BlurryDiv.svelte';
	import ZoomButton from '$components/interact/ZoomButton.svelte';
	import Github from '$components/icons/Github.svelte';
	import Url from '$components/icons/Url.svelte';
	import SkillTagsContainer from '$components/SkillTagsContainer.svelte';
	import H3Title from '$components/H3Title.svelte';
	import Link from '$components/interact/Link.svelte';

	import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages

	interface BigProjectCardProps {
		title: string;
		mainSkill: string;
		skills: string[];
		description: string;
		githubUrl?: string;
		projectUrl?: string;
		projectUrlTarget?: string;
		collaborators?: Collaborator[];
		tabindex?: number;
		bigSize?: boolean;
	}

	let {
		title,
		mainSkill,
		skills,
		description,
		githubUrl,
		projectUrl,
		projectUrlTarget = '_blank',
		collaborators,
		tabindex = 0,
		bigSize = false
	}: BigProjectCardProps = $props();

	const h3Size: string = bigSize ? h3_sizes : h3_sizes_lg;
	let iconSize: number = $state(16);

	const bigSizeGap: string = bigSize ? 'gap-6' : 'gap-3';
	const bigSizeMb: string = bigSize ? 'mb-4' : 'mb-3';

	function resizeDependentFunctions() {
		// Update icon size on resize
		// These values are now static - consider using CSS for responsive sizing
		iconSize = bigSize ? 20 : 16;
	}

	onMount(() => {
		resizeDependentFunctions();
		window.addEventListener('resize', resizeDependentFunctions);
		return () => {
			window.removeEventListener('resize', resizeDependentFunctions);
		};
	});
</script>

<BlurryDiv>
	{#snippet main()}
		<div class="space-y-3 p-6">
			<!-- <div class="bg-gradient-primary h-48 opacity-20 transition-opacity duration-300 group-hover:opacity-30"></div> -->
			<div class="flex flex-col">
				<div class="flex items-start justify-between">
					<div>
						<H3Title {title} _class={h3Size} />
						<div
							class={'inline-flex items-center rounded-full border font-semibold ' +
								text_xs +
								' mt-2 px-2 py-1'}
						>
							{mainSkill}
						</div>
					</div>
					<div class={'flex pt-1.5 ' + bigSizeGap}>
						{#if githubUrl}
							<ZoomButton href={githubUrl} target="_blank" {tabindex}>
								{#snippet main()}
									<Github size={iconSize} />
								{/snippet}
							</ZoomButton>
						{/if}
						{#if projectUrl}
							<ZoomButton href={projectUrl} target={projectUrlTarget} {tabindex}>
								{#snippet main()}
									<Url size={iconSize} />
								{/snippet}
							</ZoomButton>
						{/if}
					</div>
				</div>
			</div>
			<div>
				<p class={text_sm + ' ' + bigSizeMb}>
					{description}
				</p>
				<div class="flex flex-wrap gap-2">
					<SkillTagsContainer {skills} />
				</div>
			</div>
			{#if collaborators && collaborators.length > 0}
				<div>
					<h4 class={'font-semibold ' + text_sm}>{rm.collaborators()}</h4>
					<ul class="mt-2">
						{#each collaborators as collaborator}
							<li>
								<Link
									title={collaborator.name}
									url={collaborator.url}
									{tabindex}
									_class={text_sm}
								/>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/snippet}
</BlurryDiv>
