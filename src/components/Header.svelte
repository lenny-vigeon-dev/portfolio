<script lang="ts">
    import { onMount } from 'svelte';
    import '$/app.css';

    import {
        s
    } from '$utils/styles';
    import type { SectionData } from '$utils/interfaces';
    import { detectActiveSection } from '$utils/detectActiveSection';
    import { detectNavOverflow } from '$utils/detectNavOverflow';
    import { hamburgerOpen, activeSection } from '$lib/stores/ui';

    import ThemeButton from '$components/interact/ThemeButton.svelte';
	import SelectLanguage from '$components/interact/SelectLanguage.svelte';
    import HamburgerButton from '$components/hamburger/HamburgerButton.svelte';


    // Props interface
    interface HeaderProps {
        show?: boolean;
        title?: string;
        sections?: SectionData[];
        tabindex?: number;
    }

    let { show = true, title = 'Lenny Vigeon', sections = [], tabindex = 0 }: HeaderProps = $props();
    let navVisibility: boolean = $state(true);
    let titleVisibility: boolean = $state(true);
    let navElement: HTMLElement = $state()!;
    let headerElement: HTMLElement = $state()!;

    const gap2: string = s("gap", 2);

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
        titleVisibility = window.innerWidth > 330;
    }

    let sectionIds: string[] = $derived(sections.map(section => section.id));

    // Recalculate nav visibility when sections change
    $effect(() => {
        if (sections.length > 0) {
            setTimeout(() => navElemVisibility(), 0);
        }
    });


    function handleScroll() {
        const currentSection = detectActiveSection(sectionIds);
        activeSection.set(currentSection);
    }

    function toggleHamburger(event: MouseEvent) {
        hamburgerOpen.update(open => !open);

        // Only remove focus for mouse clicks, not keyboard navigation
        if (event.detail !== 0) {
            (event.currentTarget as HTMLButtonElement).blur();
        }
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
            const currentSection = detectActiveSection(sectionIds);
            activeSection.set(currentSection);
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

<header bind:this={headerElement}
       class="fixed top-0 left-0 right-0 z-50 p-2 \
       backdrop-blur bg-lbg6/50 dark:bg-dbg6/50 \
       flex items-center justify-between w-full transition-all duration-150 origin-top
       {show ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}">
    {#if titleVisibility}
        <h1 class="pl-5 text-xl font-bold text-lt1 dark:text-dt1">
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
                        <a href="#{section.id}" tabindex={show ? tabindex : -1}
                           onclick={(e) => {
                               e.preventDefault();
                               scrollToSection(section.id);
                           }}
                           class="transition-colors duration-200 \
                           text-lt1 dark:text-dt1 hover:text-lt3 dark:hover:text-dt3 \
                           {$activeSection === section.id
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
        <ThemeButton tabindex={show ? tabindex : -1} />
        <SelectLanguage tabindex={show ? tabindex : -1} />
        {#if !navVisibility && sections.length > 0}
            <HamburgerButton
                isOpen={$hamburgerOpen}
                onToggle={toggleHamburger}
                tabindex={show ? tabindex : -1} />
        {/if}
    </div>
</header>
