<script lang="ts">
    // Add scroll listener on mount
    import { onMount } from 'svelte';
	import '$/app.css';

	import {
		colored_title,
		h1_sizes,
		h2_sizes,
		h3_sizes,
        rounded_2xl,
		p_font_sizes_l,
		p_font_sizes_m,
		p_width,
        svg_scale,
        s
	} from '$utils/styles';
	import JumpingMouse from '$components/JumpingMouse.svelte';
	import Button from '$components/interact/Button.svelte';
	import ZoomButton from '$components/interact/ZoomButton.svelte';
	import ThemeButton from '$components/interact/ThemeButton.svelte';
	import SelectLanguage from '$components/interact/SelectLanguage.svelte';
	import AnimatedBackground from '$components/AnimatedBackground.svelte';
	import TextCard from '$components/TextCard.svelte';
    import SkillCard from '$components/SkillCard.svelte';
    import ProjectCard from '$components/ProjectCard.svelte';
    import SectionTitle from '$components/SectionTitle.svelte';


	import Email from '$components/logos/Email.svelte';
	import Linkedin from '$components/logos/Linkedin.svelte';
	import Github from '$components/logos/Github.svelte';
	import Download from '$components/logos/Download.svelte';

	import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages
	import { headerVisible, sections, headerTabIndex } from '$lib/stores/ui';
    import { JJA, ARO } from '$utils/collaborators';

    const githubUrl = 'https://github.com/Linnchoeuh';
    const beforeTabIndex: number = 1;
	headerTabIndex.set(2);
    const tabIndex: number = 3;

    const gap2: string = s("gap", 2);
    const gap4: string = s("gap", 4);
    const gap6: string = s("gap", 6);
    const gap10: string = s("gap", 10);
    const gap12: string = s("gap", 12);
    const mb1: string = s("mb", 1);
    const mb12: string = s("mb", 12);
    const mb10: string = s("mb", 10);
    const mb14: string = s("mb", 14);
    const mt12: string = s("mt", 12);
    const p8: string = s("p", 8);
    const px4: string = s("px", 4);

	// let darkMode = $state(true);
	let header = $state(false); // Control header visibility
    let jumpingMouseOpacity = $state(1); // Initial opacity
	let firstSection: HTMLElement; // Reference to first section
    $effect(() => {
        // Update sections store with reactive messages
        sections.set([
            { id: 'about', name: rm.section_about() },
            { id: 'skills', name: rm.section_skills() },
            { id: 'projects', name: rm.section_projects() }
        ]);
    });

	// Function to update opacity based on scroll position
	function updateJumpingMouseOpacity() {
		if (!firstSection) return; // Exit if section not ready

		const scrollY = window.scrollY;
		const sectionHeight = firstSection.offsetHeight;
		const fadeDistance = sectionHeight * 0.5; // Fade over 50% of section height

		// Calculate opacity: 1 at top, 0 when scrolled fadeDistance
		const opacity = Math.max(0, 1 - (scrollY / fadeDistance));
		jumpingMouseOpacity = opacity;
	}

    function displayHeader() {
        if (!firstSection) return; // Exit if section not ready

		const scrollY = window.scrollY;
		const sectionHeight = firstSection.offsetHeight;

        header = scrollY > sectionHeight * 0.5;
        // Mettre à jour le store pour le layout
        headerVisible.set(header);
        // console.log(`Header visibility: ${header}`); // Debugging log
    }

    function scrollDependentFunctions() {
        updateJumpingMouseOpacity();
        displayHeader();
    }

	onMount(() => {
        scrollDependentFunctions();
		window.addEventListener('scroll', scrollDependentFunctions);
		return () => window.removeEventListener('scroll', scrollDependentFunctions);
	});
</script>


<section bind:this={firstSection} class={'relative flex min-h-screen flex-col justify-between overflow-x-hidden '}>
    <AnimatedBackground />
    <div class={"relative flex justify-end p-[0.75%]" + gap2}>
        <ThemeButton tabindex={beforeTabIndex} />
        <SelectLanguage tabindex={beforeTabIndex} />
    </div>
    <div class="relative container mx-auto flex flex-col items-center px-4 text-center">
        <h2 class={h2_sizes + mb1}>{rm.me_name()}</h2>
        <h1 class={colored_title + h1_sizes + mb1}>{rm.me_title()}</h1>
        <div class="flex max-w-[60%] flex-col items-center justify-center">
            <p class={p_font_sizes_l + p_width + mb10}>{rm.me_mission()}</p>
            <div class={"animate-in slide-in-from-bottom-4 \
            flex flex-wrap justify-center " +
            gap4 + mb12}>
                <Button text={rm.me_contact()} tabindex={beforeTabIndex}>
                    {#snippet main()}
                        <Email _class={svg_scale} />
                    {/snippet}
                </Button>
                <Button text={rm.me_resume()} href="/{rm.cv_pdf()}" target="_blank" tabindex={beforeTabIndex}>
                    {#snippet main()}
                        <Download _class={svg_scale} />
                    {/snippet}
                </Button>
            </div>
            <div class={"animate-in slide-in-from-bottom-4 \
            flex justify-center" +
            gap10}>
                <ZoomButton href={githubUrl} target="_blank" tabindex={beforeTabIndex}>
                    {#snippet main()}
                        <Github size={32} _class="text-lt3 dark:text-dt3" />
                    {/snippet}
                </ZoomButton>
                <ZoomButton href="https://www.linkedin.com/in/lenny-vigeon/" target="_blank" tabindex={beforeTabIndex}>
                    {#snippet main()}
                        <Linkedin size={32} _class="text-lt3 dark:text-dt3" />
                    {/snippet}
                </ZoomButton>
            </div>
        </div>
    </div>
    <JumpingMouse _class="" _style="opacity: {jumpingMouseOpacity}; transition: opacity 0.3s ease-out;" />
</section>

<section id="about" class="py-[6%] \
bg-lbg3/80 dark:bg-dbg3/90 \
relative flex flex-col \
transition-all duration-300 overflow-x-hidden">
    <div class="mx-auto max-w-[90%] md:max-w-[80%] \
    transition-all duration-200">
        <SectionTitle title={rm.about_me()} subtitle={rm.about_me_content()} />
        <div class={"bg-lbg4 dark:bg-dbg4" + rounded_2xl + p8}>
            <div class={"grid grid-cols-1 lg:grid-cols-2 items-center" + gap12}>
                <div>
                    <h3 class={"font-bold" + h3_sizes + mb14}>
                        {rm.journey()}
                    </h3>
                    <p class={p_font_sizes_m + mb14}>
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

<section id="skills" class={"py-[5%] min-h-screen overflow-x-hidden" + px4}>
    <div class="relative container mx-auto max-w-[90%] md:max-w-[80%]">
        <SectionTitle title={rm.technical_skills()} subtitle={rm.technical_skills_content()} />
        <div class={"grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3" + gap6}>
            <SkillCard title={rm.frontend_dev()} skills={['Svelte', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'React Native']} />
            <SkillCard title={rm.backend_dev()} skills={['Node.js', 'SvelteKit', 'Python', 'Flask', 'Express', 'REST APIs', 'Microservices']} />
            <SkillCard title={rm.devops_db_cloud()} skills={['PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'Github Actions', 'CI/CD', 'Vite']} />
            <SkillCard title={rm.ai_ml()} skills={['TensorFlow', 'PyTorch', 'OpenAI API', 'Mistral API', 'ONNX', 'Mediapipe']} />
            <SkillCard title={rm.tools_platforms()} skills={['Git', 'CI/CD', 'Windows 7/8/10/11', 'Linux (Arch/Ubuntu)', 'CMake', 'Makefile']} />
            <SkillCard title={rm.miscellaneous()} skills={['C', 'C++', 'TrueNAS', 'systemd',  'VSCode', 'emacs', 'vim', 'nvim', 'Unit testing', 'Functional testing']} />
        </div>
    </div>
</section>

<section id="projects" class="py-[5%] \
bg-lbg3/80 dark:bg-dbg3/90 \
relative flex flex-col \
transition-all duration-300 overflow-x-hidden">
	<div class="container mx-auto max-w-[90%] md:max-w-[80%]">
        <SectionTitle title={rm.featured_projects()} subtitle={rm.featured_projects_content()} />
        <!-- Spotlight Projects -->
		<!-- <div class="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
		</div> -->
		<div class={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" + gap6}>
            <ProjectCard
                title={rm.fsl_recognizer_title()}
                mainSkill="AI/ML/Frontend"
                skills={['Svelte', 'Python', 'ONNX', 'Pytorch', 'mediapipe', 'OpenCV', 'Transformer']}
                description={rm.fsl_recognizer_description()}
                githubUrl="https://github.com/EIP-TEK89/trio-signo-ai"
                projectUrl="/"
                tabindex={tabIndex}
                collaborators={[JJA]}
            />
            <ProjectCard
                title={rm.toobo_title()}
                mainSkill="Frontend"
                skills={['Vue.js', 'HTML5', 'TypeScript', 'Vite', 'Local Storage', 'CSS3']}
                description={rm.toobo_description()}
                githubUrl="https://github.com/lenny-vigeon-dev/Toobo"
                projectUrl="/"
                tabindex={tabIndex}
            />
            <ProjectCard
                title="OriginL"
                mainSkill="Frontend"
                skills={['Svelte 5', 'HTML5', 'TypeScript', 'Vite', 'Tailwind CSS']}
                description={rm.originl_description()}
                githubUrl="https://github.com/lenny-vigeon-dev/originL-website"
                projectUrl="https://origin-l-website.vercel.app/"
                tabindex={tabIndex}
            />
            <ProjectCard
                title="WurioWire"
                mainSkill="Video Game"
                skills={['Python', 'Pygame', 'Class inheritance']}
                description={rm.wuriowire_description()}
                githubUrl="https://github.com/Linnchoeuh/JAM-Wurio-Wire"
                collaborators={[JJA, ARO]}
                tabindex={tabIndex}
            />
            <ProjectCard
                title={rm.portfolio_title()}
                mainSkill="Frontend"
                skills={['Svelte 5', 'Tailwind CSS', 'HTML5', 'TypeScript', 'Vite', 'pnpm', 'Github Actions']}
                description={rm.portfolio_description()}
                githubUrl="https://github.com/lenny-vigeon-dev/portfolio"
                tabindex={tabIndex}
            />
		</div>
        <div class={mt12 + " flex justify-center"}>
            <Button text={rm.view_more_on_github()} href={githubUrl} target="_blank" tabindex={tabIndex}>
                {#snippet main()}
                    <Github _class={svg_scale} />
                {/snippet}
            </Button>
        </div>
	</div>
</section>
