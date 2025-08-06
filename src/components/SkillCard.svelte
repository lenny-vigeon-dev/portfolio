<script lang="ts">
    import "$/app.css"

    import {
        primary_gradient,
        p_font_sizes_s,
        h3_sizes,
        rounded_lg,
        gap2
    } from "$utils/styles";

    interface SkillCardProps {
        title: string;
        skills: string[];
    }

    let { title, skills }: SkillCardProps = $props();

</script>

<div
    class={rounded_lg + "group backdrop-blur \
    border-1 dark:border-white/20 border-black/20 \
    hover:dark:border-dcol2/50 hover:border-lcol1/50 \
    transition-all duration-300 hover:-translate-y-2"}
>
    <div class="flex flex-col p-[5%]">
        <h3 class={h3_sizes + "text-xl font-semibold \
        group-hover:text-lcol2 dark:group-hover:text-dcol1 \
        tracking-tight transition-colors duration-300"}>
            {title}
        </h3>
    </div>
    <div class={"flex flex-wrap p-[5%] pt-0" + gap2}>
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
                    text-xs font-semibold hover:text-lt2 hover:dark:text-dt2 \
                    transition-all duration-300"}
                >
                    {skill}
                </div>

            </div>

        </div>
        {/each}
    </div>
</div>
