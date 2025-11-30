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
		svg_scale
	} from '$utils/styles';
	import JumpingMouse from '$components/JumpingMouse.svelte';
	import Button from '$components/interact/Button.svelte';
	import ZoomButton from '$components/interact/ZoomButton.svelte';
	import ThemeButton from '$components/interact/ThemeButton.svelte';
	import SelectLanguage from '$components/interact/SelectLanguage.svelte';
	import AnimatedBackground from '$components/AnimatedBackground.svelte';
	import TextCard from '$components/cards/TextCard.svelte';
	import SkillCard from '$components/cards/SkillCard.svelte';
	import ProjectCard from '$components/cards/ProjectCard.svelte';
	import SectionTitle from '$components/SectionTitle.svelte';

	import Grid from '$components/containers/Grid.svelte';
	import CollaboratorCard from '$components/cards/CollaboratorCard.svelte';

	import Email from '$components/icons/Email.svelte';
	import Linkedin from '$components/icons/Linkedin.svelte';
	import Github from '$components/icons/Github.svelte';
	import Download from '$components/icons/Download.svelte';

	import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages
	import { headerVisible, sections, headerTabIndex } from '$lib/stores/ui';
	import { JJA, ARO } from '$utils/collaborators';

	import ContactSection from '$components/sections/Contact.svelte';

	const githubUrl = 'https://github.com/Linnchoeuh';
	const beforeTabIndex: number = 1;
	headerTabIndex.set(2);
	const tabIndex: number = 3;

	// let darkMode = $state(true);
	let header = $state(false); // Control header visibility
	let jumpingMouseOpacity = $state(1); // Initial opacity
	let firstSection: HTMLElement; // Reference to first section
	let icon_size16: number = $state(16);
	let icon_size24: number = $state(24);
	let icon_size32: number = $state(32);

	$effect(() => {
		// Update sections store with reactive messages
		sections.set([
			{ id: 'about', name: rm.section_about() },
			{ id: 'skills', name: rm.section_skills() },
			{ id: 'projects', name: rm.section_projects() },
			{ id: 'collaborators', name: rm.section_collaborators() },
			{ id: 'contact', name: rm.section_contact() }
		]);
	});

	// Function to update opacity based on scroll position
	function updateJumpingMouseOpacity() {
		if (!firstSection) return; // Exit if section not ready

		const scrollY = window.scrollY;
		const sectionHeight = firstSection.offsetHeight;
		const fadeDistance = sectionHeight * 0.5; // Fade over 50% of section height

		// Calculate opacity: 1 at top, 0 when scrolled fadeDistance
		const opacity = Math.max(0, 1 - scrollY / fadeDistance);
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

	function resizeDependentFunctions() {
		// Update icon size on resize
		// These values are now static - consider using CSS for responsive sizing
		icon_size16 = 16;
		icon_size24 = 24;
		icon_size32 = 32;
	}

	onMount(() => {
		scrollDependentFunctions();
		resizeDependentFunctions();
		window.addEventListener('scroll', scrollDependentFunctions);
		window.addEventListener('resize', resizeDependentFunctions);
		return () => {
			window.removeEventListener('scroll', scrollDependentFunctions);
			window.removeEventListener('resize', resizeDependentFunctions);
		};
	});
</script>

<section bind:this={firstSection} class={'relative flex min-h-screen flex-col justify-between'}>
	<AnimatedBackground />
	<div class="relative m-5 flex justify-end gap-2">
		<ThemeButton tabindex={beforeTabIndex} />
		<SelectLanguage tabindex={beforeTabIndex} />
	</div>
	<div class="relative flex flex-col items-center px-4 text-center">
		<h2 class={h2_sizes + ' mb-1'}>{rm.me_name()}</h2>
		<h1 class={colored_title + h1_sizes + ' mb-1'}>{rm.me_title()}</h1>
		<div
			class="flex w-full max-w-[90%] flex-col items-center justify-center sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
		>
			<p class={p_font_sizes_l + p_width + ' mb-10'}>{rm.me_mission()}</p>
			<div class="mb-12 flex w-full flex-wrap justify-center gap-4">
				<Button text={rm.me_contact()} tabindex={beforeTabIndex} href="#contact">
					{#snippet main()}
						<Email size={icon_size16} />
					{/snippet}
				</Button>
				<Button
					text={rm.me_resume()}
					href="/{rm.cv_pdf()}"
					target="_blank"
					tabindex={beforeTabIndex}
				>
					{#snippet main()}
						<Download size={icon_size16} />
					{/snippet}
				</Button>
			</div>
			<div class="relative flex w-full justify-center gap-10">
				<ZoomButton href={githubUrl} target="_blank" tabindex={beforeTabIndex}>
					{#snippet main()}
						<Github size={icon_size32} _class="text-lt3 dark:text-dt3" />
					{/snippet}
				</ZoomButton>
				<ZoomButton
					href="https://www.linkedin.com/in/lenny-vigeon/"
					target="_blank"
					tabindex={beforeTabIndex}
				>
					{#snippet main()}
						<Linkedin size={icon_size32} _class="text-lt3 dark:text-dt3" />
					{/snippet}
				</ZoomButton>
			</div>
		</div>
	</div>
	<JumpingMouse
		_class="mb-20"
		_style="opacity: {jumpingMouseOpacity}; transition: opacity 0.3s ease-out;"
	/>
</section>

<section
	id="about"
	class="\ \
\ relative flex
flex-col overflow-x-hidden bg-lbg3/80 py-[6%]
transition-all duration-300 dark:bg-dbg3/90"
>
	<div
		class="\ mx-auto max-w-[90%] transition-all
    duration-200 md:max-w-[80%]"
	>
		<SectionTitle title={rm.about_me()} subtitle={rm.about_me_content()} />
		<div class={'bg-lbg4 dark:bg-dbg4 ' + rounded_2xl + ' p-8'}>
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div>
					<h3 class={'font-bold ' + h3_sizes + ' mb-14'}>
						{rm.journey()}
					</h3>
					<p class={p_font_sizes_m + ' mb-14'}>
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

<section id="skills" class="min-h-screen overflow-x-hidden px-4 py-[5%]">
	<div class="relative container mx-auto max-w-[90%] md:max-w-[80%]">
		<SectionTitle title={rm.technical_skills()} subtitle={rm.technical_skills_content()} />
		<Grid>
			{#snippet main()}
				<SkillCard
					title={rm.frontend_dev()}
					skills={[
						'Svelte',
						'Vue.js',
						'React',
						'TypeScript',
						'Tailwind CSS',
						'JavaScript',
						'HTML5',
						'CSS3',
						'React Native'
					]}
				/>
				<SkillCard
					title={rm.backend_dev()}
					skills={[
						'Node.js',
						'SvelteKit',
						'Python',
						'Flask',
						'Express',
						'REST APIs',
						'Microservices'
					]}
				/>
				<SkillCard
					title={rm.devops_db_cloud()}
					skills={['PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'Github Actions', 'CI/CD', 'Vite']}
				/>
				<SkillCard
					title={rm.ai_ml()}
					skills={['TensorFlow', 'PyTorch', 'OpenAI API', 'Mistral API', 'ONNX', 'Mediapipe']}
				/>
				<SkillCard
					title={rm.tools_platforms()}
					skills={['Git', 'CI/CD', 'Windows 7/8/10/11', 'Linux (Arch/Ubuntu)', 'CMake', 'Makefile']}
				/>
				<SkillCard
					title={rm.miscellaneous()}
					skills={[
						'C',
						'C++',
						'TrueNAS',
						'systemd',
						'VSCode',
						'emacs',
						'vim',
						'nvim',
						'Unit testing',
						'Functional testing'
					]}
				/>
			{/snippet}
		</Grid>
	</div>
</section>

<section
	id="projects"
	class="\ \
\ relative flex
flex-col overflow-x-hidden bg-lbg3/80 py-[5%]
transition-all duration-300 dark:bg-dbg3/90"
>
	<div class="container mx-auto max-w-[90%] md:max-w-[80%]">
		<SectionTitle title={rm.featured_projects()} subtitle={rm.featured_projects_content()} />
		<!-- Spotlight Projects -->
		<!-- <div class="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
		</div> -->
		<Grid>
			{#snippet main()}
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
					projectUrl="https://toobo-hqoknaw1t-lennys-projects-4f8ace83.vercel.app/"
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
					skills={[
						'Svelte 5',
						'Tailwind CSS',
						'HTML5',
						'TypeScript',
						'Vite',
						'pnpm',
						'Github Actions'
					]}
					description={rm.portfolio_description()}
					githubUrl="https://github.com/lenny-vigeon-dev/portfolio"
					tabindex={tabIndex}
				/>
			{/snippet}
		</Grid>
		<div class="mt-12 flex justify-center">
			<Button text={rm.view_more_on_github()} href={githubUrl} target="_blank" tabindex={tabIndex}>
				{#snippet main()}
					<Github size={icon_size16} />
				{/snippet}
			</Button>
		</div>
	</div>
</section>

<section
	id="collaborators"
	class="\ \
\ relative flex flex-col
overflow-x-hidden bg-lbg3/80 pb-[5%]
transition-all duration-300 dark:bg-dbg3/90"
>
	<div class="mb-5 flex justify-center">
		<div class="w-[10%] border-1 border-lt3 dark:border-dt3"></div>
	</div>
	<div class="container mx-auto max-w-[90%] md:max-w-[80%]">
		<SectionTitle title={rm.collaborators()} />
		<Grid>
			{#snippet main()}
				<CollaboratorCard
					name={ARO.name}
					title={ARO.title?.()}
					description={ARO.description?.()}
					skills={ARO.skills}
					linkedin={ARO.linkedin}
					github={ARO.github}
					website={ARO.website}
					tabindex={tabIndex}
				/>
				<CollaboratorCard
					name={JJA.name}
					title={JJA.title?.()}
					description={JJA.description?.()}
					skills={JJA.skills}
					linkedin={JJA.linkedin}
					github={JJA.github}
					tabindex={tabIndex}
				/>
			{/snippet}
		</Grid>
	</div>
</section>

<ContactSection {tabIndex} />
