<script lang="ts">
    import "$/app.css"

    import {
        primary_gradient,
        h3_sizes_lg,
        h3_sizes,
        rounded_lg,
        gap2
    } from "$utils/styles";

    import BlurryDiv from "./BlurryDiv.svelte";
    import ZoomButton from "./ZoomButton.svelte";
    import Github from "./logos/Github.svelte";
    import Url from "./logos/Url.svelte";
    import SkillTagsContainer from "./SkillTagsContainer.svelte";
    import H3Title from "./H3Title.svelte";

    interface BigProjectCardProps {
        title: string;
        mainSkill: string;
        skills: string[];
        description: string;
        githubUrl?: string;
        projectUrl?: string;
        bigSize?: boolean;
    }

    let { title, mainSkill, skills, description, githubUrl, projectUrl, bigSize = false }: BigProjectCardProps = $props();

    const h3Size: string = bigSize ? h3_sizes : h3_sizes_lg;
    const iconSize: number = bigSize ? 20 : 16;
</script>

<BlurryDiv>
    {#snippet main()}
		<!-- <div class="bg-gradient-primary h-48 opacity-20 transition-opacity duration-300 group-hover:opacity-30"></div> -->
		<div class="flex flex-col space-y-1.5 p-6">
			<div class="flex items-start justify-between">
				<div>
					<H3Title title={title} _class={h3Size} />
					<div class="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
						{mainSkill}
					</div>
				</div>
				<div class={"flex pt-1.5 " + (bigSize ? " gap-6" : " gap-3")}>
					{#if githubUrl}
                        <ZoomButton href={githubUrl} target="_blank">
                            {#snippet main()}
                                <Github size={iconSize} _class="text-lt3 dark:text-dt3" />
                            {/snippet}
                        </ZoomButton>
                    {/if}
                    {#if projectUrl}
                        <ZoomButton href={projectUrl} target="_blank">
                            {#snippet main()}
                                <Url size={iconSize} _class="text-lt3 dark:text-dt3" />
                            {/snippet}
                        </ZoomButton>
                    {/if}
				</div>
			</div>
		</div>
		<div class="p-6 pt-0">
			<p class={"text-muted-foreground text-sm " + (bigSize ? "mb-4" : "mb-3")}>
				{description}
			</p>
			<div class="flex flex-wrap gap-2">
				<SkillTagsContainer skills={skills} />
			</div>
		</div>
    {/snippet}
</BlurryDiv>
