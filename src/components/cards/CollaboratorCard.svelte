<script lang="ts">
	import '$/app.css';

	import { text_xl, text_md, text_sm, primary_gradient } from '$utils/styles';
	import { onMount } from 'svelte';

	interface CollaboratorCardProps {
		name: string;
		title: string;
		description: string;
		skills: string[];
		img?: string | undefined;
		linkedin?: string | undefined;
		github?: string | undefined;
		website?: string | undefined;
		tabindex?: number | undefined;
	}

	let {
		name,
		title,
		description,
		skills,
		img,
		linkedin,
		github,
		website,
		tabindex = 0
	}: CollaboratorCardProps = $props();

	import BlurryDiv from '$components/containers/BlurryDiv.svelte';
	import SkillTagsContainer from '$components/SkillTagsContainer.svelte';
	import Grid12 from '$components/containers/Grid12.svelte';
	import ZoomButton from '$components/interact/ZoomButton.svelte';

	import Linkedin from '$components/icons/Linkedin.svelte';
	import Github from '$components/icons/Github.svelte';
	import Url from '$components/icons/Url.svelte';

	const initial_size = 16;
	let icon_size: number = $state(initial_size);
	const initials: string = getInitials(name);

	function getInitials(name: string): string {
		let space_split: string[] = name.split(' ');
		let final_split: string[] = [];
		for (const elem in space_split) final_split = final_split.concat(space_split[elem].split('-'));
		return final_split.map((word) => word[0].toUpperCase()).join('');
	}

	function resizeDependentFunctions() {
		// Update icon size on resize
		// These values are now static - consider using CSS for responsive sizing
		icon_size = initial_size;
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
			<div class="flex justify-between">
				<div class="flex space-x-4">
					<div class="flex h-12 w-12 items-center justify-center">
						{#if img}
							<img src={img} alt={name} class="h-12 w-12 rounded-full" />
						{:else}
							<div
								class={'flex h-12 w-12 items-center justify-center rounded-full ' +
									primary_gradient}
							>
								<text class={'font-semibold ' + text_md}>{initials}</text>
							</div>
						{/if}
					</div>
					<div>
						<h3 class={'font-semibold ' + text_md + ' mb-1'}>{name}</h3>
						<p class={text_sm}>{title}</p>
					</div>
				</div>
				<div class="">
					<Grid12 gap={2} toRight={true}>
						{#snippet main()}
							{#if linkedin}
								<ZoomButton href={linkedin} target="_blank" {tabindex}>
									{#snippet main()}
										<Linkedin size={icon_size} _class="text-lt3 dark:text-dt3" />
									{/snippet}
								</ZoomButton>
							{/if}
							{#if github}
								<ZoomButton href={github} target="_blank" {tabindex}>
									{#snippet main()}
										<Github size={icon_size} _class="text-lt3 dark:text-dt3" />
									{/snippet}
								</ZoomButton>
							{/if}
							{#if website}
								<ZoomButton href={website} target="_blank" {tabindex}>
									{#snippet main()}
										<Url size={icon_size} _class="text-lt3 dark:text-dt3" />
									{/snippet}
								</ZoomButton>
							{/if}
						{/snippet}
					</Grid12>
				</div>
			</div>
			<p class={text_sm}>{description}</p>
			<SkillTagsContainer {skills} />
		</div>
	{/snippet}
</BlurryDiv>
