<script lang="ts">
    import { onMount } from 'svelte';
    import '$/app.css';

    import {
        gap2
    } from '$utils/styles';
    import type { SectionData } from '$utils/interfaces';
    import { detectActiveSection } from '$utils/detectActiveSection';
    import { detectNavOverflow } from '$utils/detectNavOverflow';

    import ThemeButton from '$components/ThemeButton.svelte';
	import SelectLanguage from '$components/SelectLanguage.svelte';
    import HamburgerMenu from '$components/HamburgerMenu.svelte';


    // Props interface
    interface HeaderProps {
        show?: boolean;
        title?: string;
        sections?: SectionData[];
    }

    let { show = true, title = 'Lenny Vigeon', sections = [] }: HeaderProps = $props();
    let navVisibility: boolean = $state(true);
    let titleVisibility: boolean = $state(true);
    let activeSection: string = $state('');
    let hamburgerOpen: boolean = $state(false);
    let navElement: HTMLElement = $state()!;
    let headerElement: HTMLElement = $state()!;

    function navElemVisibility() {
        if (!window) return;

        // First check: minimum width requirement
        if (window.innerWidth < 640) {
            navVisibility = false;
            return;
        }

        // Second check: would nav overflow the header?
        const wouldOverflow = detectNavOverflow(headerElement, sections);
        navVisibility = !wouldOverflow;
    }

    function detectTitleVisibility() {
        if (!window) return;

        // First check: minimum width requirement
        titleVisibility = window.innerWidth > 320;
    }

    let sectionIds: string[] = $derived(sections.map(section => section.id));

    // Recalculate nav visibility when sections change
    $effect(() => {
        if (sections.length > 0) {
            setTimeout(() => navElemVisibility(), 0);
        }
    });


    function handleScroll() {
        activeSection = detectActiveSection(sectionIds);
    }

    function toggleHamburger() {
        hamburgerOpen = !hamburgerOpen;
    }

    function handleHamburgerNavigation(sectionId: string) {
        scrollToSection(sectionId);
    }

    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (!element) return;

        // Calculate header height dynamically
        const headerHeight = headerElement?.offsetHeight || 80;
        const offset = headerHeight; // 20px extra padding

        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    onMount(() => {
        // Detect and apply saved/preferred theme

        // Wait for DOM to be ready before checking nav visibility
        setTimeout(() => {
            navElemVisibility();
            activeSection = detectActiveSection(sectionIds);
        }, 0);

        window.addEventListener('resize', navElemVisibility);
        window.addEventListener('resize', detectTitleVisibility);
        window.addEventListener('scroll', handleScroll);

		return () => {
            window.removeEventListener('resize', navElemVisibility);
            window.removeEventListener('resize', detectTitleVisibility);
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

{#if show}
    <header bind:this={headerElement}
           class="fixed top-0 left-0 right-0 z-50 p-2 \
           backdrop-blur bg-lbg6/50 dark:bg-dbg6/50 \
           flex items-center justify-between">
        {#if titleVisibility}
            <h1 class="text-xl font-bold text-lt1 dark:text-dt1">
                {title}
            </h1>
        {:else}
            <div></div>
        {/if}
        {#if navVisibility}
            <nav bind:this={navElement} class="px-5">
                <ul class="flex space-x-6">
                    {#each sections as section}
                        <li>
                            <a href="#{section.id}"
                               onclick={(e) => {
                                   e.preventDefault();
                                   scrollToSection(section.id);
                               }}
                               class="transition-colors duration-200 \
                               text-lt1 dark:text-dt1 hover:text-lt3 dark:hover:text-dt3 \
                               {activeSection === section.id
                                   ? ' font-semibold'
                                   : ''}">
                                {section.name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        {/if}
        <div class={"relative flex justify-end items-center controls-container" + gap2}>
            <ThemeButton />
            <SelectLanguage />
            {#if !navVisibility && sections.length > 0}
                <HamburgerMenu
                    {sections}
                    {activeSection}
                    isOpen={hamburgerOpen}
                    onToggle={toggleHamburger}
                    onNavigate={handleHamburgerNavigation} />
            {/if}
        </div>
    </header>
{/if}
