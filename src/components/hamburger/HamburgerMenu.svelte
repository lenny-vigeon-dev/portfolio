<script lang="ts">
    import type { SectionData } from '$utils/interfaces';
    import { onMount } from 'svelte';

    // Props interface
    interface HamburgerMenuProps {
        sections?: SectionData[];
        activeSection?: string;
        isOpen?: boolean;
        onToggle?: () => void;
        onNavigate?: (sectionId: string) => void;
        tabindex?: number;
    }

    let {
        sections = [],
        activeSection = '',
        isOpen = false,
        onToggle = () => {},
        onNavigate = () => {},
        tabindex = 0
    }: HamburgerMenuProps = $props();

    let menuElement: HTMLDivElement;

    function handleLinkClick(event: MouseEvent, sectionId: string) {
        event.preventDefault();
        onNavigate(sectionId);
        onToggle(); // Close menu after navigation
    }

    // Détection du clic à l'extérieur du menu
    function handleClickOutside(event: Event) {
        if (isOpen && menuElement && !menuElement.contains(event.target as Node)) {
            // Éviter de fermer si on clique sur le bouton hamburger
            const target = event.target as HTMLElement;
            if (!target.closest('[aria-expanded]')) {
                onToggle();
            }
        }
    }

    // Gestion des touches (Escape pour fermer)
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && isOpen) {
            onToggle();
        }
    }

    // Détection de la perte de focus
    function handleFocusOut(event: FocusEvent) {
        // Temporisation pour laisser le temps au nouvel élément de recevoir le focus
        setTimeout(() => {
            if (isOpen && menuElement && !menuElement.contains(document.activeElement)) {
                // Ne pas fermer si le focus va sur le bouton hamburger
                const activeElement = document.activeElement as HTMLElement;
                if (!activeElement?.closest('[aria-expanded]')) {
                    onToggle();
                }
            }
        }, 150);
    }

    onMount(() => {
        // Écouter les événements sur tout le document
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<!-- Mobile Menu Overlay -->
{#if isOpen}
    <div class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
         role="button"
         tabindex="-1"
         onclick={onToggle}
         onkeydown={(e) => e.key === 'Escape' && onToggle()}
         aria-label="Close menu"></div>
{/if}
<!-- Mobile Menu -->
<div bind:this={menuElement}
     onfocusout={handleFocusOut}
     class="fixed right-2 top-16 z-40 min-w-48 rounded-lg
            bg-lbg4/95 dark:bg-dbg4/95 backdrop-blur-md border
            border-lbg2/20 dark:border-dbg2/20 shadow-lg
            transition-all duration-300 origin-top-right
            {isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}">

    <nav class="p-2">
        <ul class="space-y-1">
            {#each sections as section}
                <li>
                    <a href="#{section.id}" tabindex={isOpen ? tabindex : -1}
                       onclick={(e) => handleLinkClick(e, section.id)}
                       class="block px-4 py-3 rounded-md text-sm font-medium
                              transition-colors duration-200
                              text-lt1 dark:text-dt1 hover:bg-lbg3/50 dark:hover:bg-dbg3/50
                              {activeSection === section.id
                                  ? 'font-semibold'
                                  : ''}">
                        {section.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>
