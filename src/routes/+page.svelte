<script lang="ts">
	import '$/app.css';

	import {
		colored_title,
		h1_sizes,
		h3_sizes,
        rounded_2xl,
		p_font_sizes_l,
		p_font_sizes_m,
		p_width,
		p_width2,
        svg_scale,
        gap2,
        gap4,
        gap10,
        mb12,
        mb10
	} from '$utils/styles';
	import JumpingMouse from '$components/JumpingMouse.svelte';
	import Button from '$components/Button.svelte';
	import ZoomButton from '$components/ZoomButton.svelte';
	import ThemeButton from '$components/ThemeButton.svelte';
	import SelectLanguage from '$components/SelectLanguage.svelte';
	import AnimatedBackground from '$components/AnimatedBackground.svelte';
	import TextCard from '$components/TextCard.svelte';
    import SkillCard from '$components/SkillCard.svelte';

	import Email from '$components/logos/Email.svelte';
	import Linkedin from '$components/logos/Linkedin.svelte';
	import Github from '$components/logos/Github.svelte';
	import Download from '$components/logos/Download.svelte';

	import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages

	let darkMode = $state(true);
</script>

<div class={"bg-lbg text-lt3 transition-colors duration-300 dark:bg-dbg dark:text-dt3"}>

    <section class={'relative flex min-h-screen flex-col justify-between '}>
        <AnimatedBackground />
        <div class={"relative flex justify-end p-[0.75%]" + gap2}>
            <ThemeButton bind:darkMode />
            <SelectLanguage />
        </div>
        <div class="relative container mx-auto flex flex-col items-center px-4 text-center">
            <h1 class={colored_title + h1_sizes + 'mb-1'}>{rm.me_title()}</h1>
            <div class="flex max-w-[60%] flex-col items-center justify-center">
                <p class={p_font_sizes_l + p_width + mb10}>{rm.me_mission()}</p>
                <div class={"animate-in slide-in-from-bottom-4 \
                flex flex-wrap justify-center " +
                gap4 + mb12}>
                    <Button text={rm.me_contact()}>
                        {#snippet main()}
                            <Email _class={svg_scale} />
                        {/snippet}
                    </Button>
                    <Button text={rm.me_resume()} href="/{rm.cv_pdf()}" target="_blank">
                        {#snippet main()}
                            <Download _class={svg_scale} />
                        {/snippet}
                    </Button>
                </div>
                <div class={"animate-in slide-in-from-bottom-4 \
                flex justify-center" +
                gap10}>
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

    <section class="py-[6%] \
    bg-lbg3/95 dark:bg-dbg3/90 \
    relative flex flex-col \
    transition-all duration-300">
        <div class="mx-auto max-w-[90%] md:max-w-[80%] \
        transition-all duration-200">
            <div class="mb-[3%] text-center">
                <h2 class={colored_title + h1_sizes}>{rm.about_me()}</h2>
                <p class={'mx-auto' + p_font_sizes_l + p_width2}>{rm.about_me_content()}</p>
            </div>
            <div class={"bg-lbg4 dark:bg-dbg4 \
            p-8 md:p-[2%]" +
            rounded_2xl}>
                <div class="grid grid-cols-1 lg:grid-cols-2 items-center \
                gap-12 2kp:gap-20 uhdp:gap-32 4kp:gap-44 2uhd:gap-56">
                    <div>
                        <h3 class={"mb-[3%] font-bold" + h3_sizes}>
                            {rm.journey()}
                        </h3>
                        <p class={'mb-[3%]' + p_font_sizes_m}>
                            {rm.journey_content1()}
                        </p>
                        <p class={p_font_sizes_m}>
                            {rm.journey_content2()}
                        </p>
                    </div>
                    <div class="space-y-[2%]">
                        <TextCard title={rm.philosophy()} content={rm.philosophy_content()} />
                        <TextCard title={rm.approach()} content={rm.approach_content()} />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-[5%] min-h-screen">
        <div class="relative container mx-auto max-w-[80%]">
            <div class="mb-[4%] text-center">
                <h2 class={colored_title + h1_sizes}>{rm.technical_skills()}</h2>
                <p class={"mx-auto max-w-3xl text-lg" +
                p_width + p_font_sizes_l}>
                {rm.technical_skills_content()}
            </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 \
            gap-6 2kp:gap-10 uhdp:gap-16 4kp:gap-22 2uhd:gap-28">
                <SkillCard title={rm.frontend_dev()} skills={['Svelte', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'React Native']} />
                <SkillCard title={rm.backend_dev()} skills={['Node.js', 'SvelteKit', 'Python', 'Flask', 'Express', 'REST APIs', 'Microservices']} />
                <SkillCard title={rm.devops_db_cloud()} skills={['PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'Github Actions', 'CI/CD', 'Vite']} />
                <SkillCard title={rm.ai_ml()} skills={['TensorFlow', 'PyTorch', 'OpenAI API', 'Mistral API', 'ONNX', 'Mediapipe']} />
                <SkillCard title={rm.tools_platforms()} skills={['Git', 'CI/CD', 'Windows 7/8/10/11', 'Linux (Arch/Ubuntu)', 'CMake', 'Makefile']} />
                <SkillCard title={rm.miscellaneous()} skills={['C', 'C++', 'TrueNAS', 'systemd',  'VSCode', 'emacs', 'vim', 'nvim', 'Unit testing', 'Functional testing']} />
            </div>
        </div>
    </section>
</div>
