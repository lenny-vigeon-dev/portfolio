<script lang="ts">
    import "$/app.css"

    import {
        colored_title,
        animated500,
        h1_sizes,
        p_font_sizes,
        p_width
    } from "$utils/styles";
    import JumpingMouse from "$components/JumpingMouse.svelte";
    import Button from "$components/Button.svelte";
    import ZoomButton from "$components/ZoomButton.svelte";
    import ThemeButton from "$components/ThemeButton.svelte";
    import SelectLanguage from "$components/SelectLanguage.svelte";
    import AnimatedBackground from "$components/AnimatedBackground.svelte";

    import Email from "$components/logos/Email.svelte";
    import Linkedin from "$components/logos/Linkedin.svelte";
    import Github from "$components/logos/Github.svelte";
    import Download from "$components/logos/Download.svelte";

    import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages


    let darkMode = $state(true);

</script>


<section class={"transition-colors duration-300 h-screen relative flex justify-between flex-col bg-lbg dark:bg-dbg text-ltext dark:text-dtext "}>
    <AnimatedBackground />
    <div class="inset-0">
        <div class="p-5 justify-end flex gap-2">
            <ThemeButton bind:darkMode={darkMode} />
            <SelectLanguage />
        </div>
    </div>
    <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class={colored_title + h1_sizes + animated500 + "mb-1"}>{rm.me_title()}</h1>
        <div class="max-w-4xl mx-auto">
            <p class={p_font_sizes + animated500 + p_width + "mb-8 mx-auto"}>{rm.me_mission()}</p>
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
                        <Github size={32} _class="text-ltext dark:text-dtext" />
                    {/snippet}
                </ZoomButton>
                <ZoomButton href="https://www.linkedin.com/in/lenny-vigeon/" target="_blank">
                    {#snippet main()}
                        <Linkedin size={32} _class="text-ltext dark:text-dtext" />
                    {/snippet}
                </ZoomButton>
            </div>
        </div>
    </div>
    <JumpingMouse />
</section>

<section class="py-20 px-4 bg-lbg dark:bg-dbg text-ltext dark:text-dtext transition-colors duration-300 relative flex justify-between flex-col">
    <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
            <h2 class={colored_title + h1_sizes + animated500}>About Me</h2>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">I'm a passionate developer who bridges the gap between traditional software development and cutting-edge artificial intelligence. With expertise in both fullstack web development and AI technologies, I create intelligent applications that solve real-world problems.</p>
        </div>
        <div class="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 class="text-3xl font-bold mb-6 text-foreground">My Journey</h3>
                    <p class="text-muted-foreground mb-6">Started as a web developer, I discovered my passion for AI and machine learning. This unique combination allows me to build applications that are not just functional, but intelligent and adaptive.</p>
                    <p class="text-muted-foreground">I specialize in creating end-to-end solutions that leverage the power of modern web technologies combined with AI capabilities, from natural language processing to computer vision and predictive analytics.</p>
                </div>
                <div class="space-y-6">
                    <div class="bg-card/30 backdrop-blur rounded-lg p-6 border border-border/30">
                        <h4 class="text-xl font-semibold mb-2 text-foreground">Philosophy</h4>
                        <p class="text-muted-foreground">"Technology should augment human capabilities, not replace them. I build AI solutions that empower users and solve meaningful problems."</p>
                    </div>
                    <div class="bg-card/30 backdrop-blur rounded-lg p-6 border border-border/30">
                        <h4 class="text-xl font-semibold mb-2 text-foreground">Approach</h4>
                        <p class="text-muted-foreground">"Clean code, scalable architecture, and user-centered design are the foundation of every project I work on."</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
