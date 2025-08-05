<script lang="ts">
    import "$/app.css"

    import {
        colored_title,
        animated500,
        h1_sizes,
        h3_sizes,
        h4_sizes,
        p_font_sizes,
        p_font_sizes2,
        p_width,
        p_width2
    } from "$utils/styles";
    import JumpingMouse from "$components/JumpingMouse.svelte";
    import Button from "$components/Button.svelte";
    import ZoomButton from "$components/ZoomButton.svelte";
    import ThemeButton from "$components/ThemeButton.svelte";
    import SelectLanguage from "$components/SelectLanguage.svelte";
    import AnimatedBackground from "$components/AnimatedBackground.svelte";
    import TextCard from "$components/TextCard.svelte";

    import Email from "$components/logos/Email.svelte";
    import Linkedin from "$components/logos/Linkedin.svelte";
    import Github from "$components/logos/Github.svelte";
    import Download from "$components/logos/Download.svelte";

    import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages


    let darkMode = $state(true);

</script>


<section class={"transition-colors duration-300 min-h-screen relative flex justify-between flex-col bg-lbg dark:bg-dbg text-lt3 dark:text-dt3 "}>
    <AnimatedBackground />
    <div class="relative p-5 justify-end flex gap-2">
        <ThemeButton bind:darkMode={darkMode} />
        <SelectLanguage />
    </div>
    <div class="relative container mx-auto px-4 text-center flex flex-col items-center">
        <h1 class={colored_title + h1_sizes + animated500 + "mb-1"}>{rm.me_title()}</h1>
        <div class="max-w-4xl flex flex-col justify-center items-center">
            <p class={p_font_sizes + animated500 + p_width + "mb-8"}>{rm.me_mission()}</p>
            <div class="flex flex-wrap justify-center gap-4 mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
                <Button text={rm.me_contact()}>
                    {#snippet main()}
                        <Email />
                    {/snippet}
                </Button>
                <Button text={rm.me_resume()} href="/{rm.cv_pdf()}" target="_blank">
                    {#snippet main()}
                        <Download />
                    {/snippet}
                </Button>
            </div>
            <div class="flex justify-center gap-10 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
                <ZoomButton href="https://github.com/Linnchoeuh" target="_blank">
                    {#snippet main()}
                        <Github size={32} _class="text-lt3 dark:text-dt3" />
                    {/snippet}
                </ZoomButton>
                <ZoomButton href="https://www.linkedin.com/in/lenny-vigeon/" target="_blank">
                    {#snippet main()}
                        <Linkedin size={32} _class="text-lt3 dark:text-dt3" />
                    {/snippet}
                </ZoomButton>
            </div>
        </div>
    </div>
    <JumpingMouse />
</section>

<section class="py-20 px-auto \
bg-lbg3 dark:bg-dbg3 text-lt3 dark:text-dt3 \
transition-all duration-300 \
relative flex flex-col">
<div class="mx-auto transition-all duration-200 \
max-w-[90%] md:max-w-[80%] 2xl:max-w-[70%] fhdp:max-w-[60%] 2kp:max-w-[50%] uhdp:max-w-[40%]">
    <div class="text-center mb-16">
        <h2 class={colored_title + h1_sizes + animated500}>{rm.about_me()}</h2>
        <p class={p_font_sizes2 + animated500 + p_width2 + " mx-auto"}>{rm.about_me_content()}</p>
    </div>
    <div class="bg-lbg4 dark:bg-dbg4 rounded-2xl p-8 md:p-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h3 class={h3_sizes + " text-lt1 dark:text-dt1 font-bold mb-6"}>{rm.journey()}</h3>
                <p class={"text-muted-foreground mb-6" + p_font_sizes2 + animated500}>{rm.journey_content1()}</p>
                <p class={"text-muted-foreground"  + p_font_sizes2 + animated500}>{rm.journey_content2()}</p>
            </div>
            <div class="space-y-6">
                <TextCard title={rm.philosophy()}
                content={rm.philosophy_content()}
                />
                <TextCard title={rm.approach()}
                content={rm.approach_content()}
                />
            </div>
        </div>
    </div>
</div>
</section>
