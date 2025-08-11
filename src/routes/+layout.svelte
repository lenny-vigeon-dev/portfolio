<script lang="ts">
	import '$/app.css';

	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import HamburgerMenu from '$components/hamburger/HamburgerMenu.svelte';
	import { headerVisible, sections, hamburgerOpen, activeSection, headerTabIndex } from '$lib/stores/ui';

	// Types explicites pour les props
	interface LayoutProps {
		children: import('svelte').Snippet;
	}

	let { children }: LayoutProps = $props();

	function toggleHamburger() {
		hamburgerOpen.update(open => !open);
	}

	function handleHamburgerNavigation(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (!element) return;

		// Calculate header height dynamically
		const headerHeight = 80; // Approximation
		const offset = headerHeight + 20;

		const elementPosition = element.offsetTop;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
</script>

<div class={"bg-lbg text-lt3 dark:bg-dbg dark:text-dt3 \
transition-colors duration-300 w-full overflow-x-hidden"}>
	<Header show={$headerVisible} sections={$sections} tabindex={$headerTabIndex} />

	<!-- HamburgerMenu rendu au niveau du layout, en dehors du header -->
	<HamburgerMenu
		sections={$sections}
		activeSection={$activeSection}
		isOpen={$hamburgerOpen}
		onToggle={toggleHamburger}
		onNavigate={handleHamburgerNavigation}
		tabindex={$headerTabIndex} />

	{@render children()}
	<Footer />
</div>
