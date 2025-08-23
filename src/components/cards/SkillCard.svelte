<script lang="ts">
    import "$/app.css"

    import {
        h3_sizes,
    } from "$utils/styles";

    import BlurryDiv from "$components/containers/BlurryDiv.svelte";
    import H3Title from "$components/H3Title.svelte";
    import SkillTagsContainer from "$components/SkillTagsContainer.svelte";

    interface SkillCardProps {
        title: string;
        skills: string[];
    }

    let { title, skills }: SkillCardProps = $props();

</script>

<BlurryDiv>
    {#snippet main()}
        <div class="flex flex-col p-[5%]">
            <H3Title title={title} _class={h3_sizes} />
        </div>
        <div class="p-[5%] pt-0">
            <SkillTagsContainer skills={skills} />
        </div>
    {/snippet}
</BlurryDiv>
