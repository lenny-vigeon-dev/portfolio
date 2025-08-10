<script lang="ts">
    import "$/app.css"

    import {
        primary_gradient,
        p_font_sizes_s,
        gap2
    } from "$utils/styles";


    interface SkillTagsProps {
        skills: string[];
    }

    let { skills }: SkillTagsProps = $props();

</script>

<div class={"flex flex-wrap" + gap2}>
    {#each skills as skill}
    <div class={primary_gradient + "rounded-full \
    p-0.25 2kp:p-0.75 uhdp:p-1 4kp:p-1.25 2uhd:p-1.5 \
    transition-all duration-300"}>
        <div class="rounded-full transition-all duration-300 \
        hover:bg-transparent bg-lbg3 dark:bg-dbg3  ">
            <div
                class={p_font_sizes_s +
                "inline-flex cursor-default items-center rounded-full \
                px-2.5 pt-0.5 pb-1.5  \
                4kp:px-8 4kp:pt-3 4kp:pb-5  \
                font-semibold hover:text-lt2 hover:dark:text-dt2 \
                transition-all duration-300"}
            >
                {skill}
            </div>
        </div>
    </div>
    {/each}
</div>
