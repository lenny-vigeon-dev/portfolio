<script lang="ts">
    import type { SectionData } from '$utils/interfaces';

    // Props interface
    interface HamburgerMenuProps {
        sections?: SectionData[];
        activeSection?: string;
        isOpen?: boolean;
        onToggle?: () => void;
        onNavigate?: (sectionId: string) => void;
    }

    let {
        sections = [],
        activeSection = '',
        isOpen = false,
        onToggle = () => {},
        onNavigate = () => {}
    }: HamburgerMenuProps = $props();

    function handleLinkClick(event: MouseEvent, sectionId: string) {
        event.preventDefault();
        onNavigate(sectionId);
        onToggle(); // Close menu after navigation
    }
</script>

<!-- Hamburger Button -->
<button
    class="relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1
           focus:outline-none focus-visible:ring-2 focus-visible:ring-lt2 dark:focus-visible:ring-dt2 rounded"
    onclick={onToggle}
    aria-label="Toggle menu"
    aria-expanded={isOpen}>

    <!-- Top line -->
    <span class="block h-0.5 w-6 bg-lt1 dark:bg-dt1 transition-transform duration-300
                 {isOpen ? 'translate-y-1.5 rotate-45' : ''}"></span>

    <!-- Middle line -->
    <span class="block h-0.5 w-6 bg-lt1 dark:bg-dt1 transition-opacity duration-300
                 {isOpen ? 'opacity-0' : ''}"></span>

    <!-- Bottom line -->
    <span class="block h-0.5 w-6 bg-lt1 dark:bg-dt1 transition-transform duration-300
                 {isOpen ? '-translate-y-1.5 -rotate-45' : ''}"></span>
</button>

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
<div class="fixed right-2 top-16 z-40 min-w-48 rounded-lg
            bg-lbg4/95 dark:bg-dbg4/95 backdrop-blur-md border
            border-lbg2/20 dark:border-dbg2/20 shadow-lg
            transition-all duration-300 origin-top-right
            {isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}">

    <nav class="p-2">
        <ul class="space-y-1">
            {#each sections as section}
                <li>
                    <a href="#{section.id}"
                       onclick={(e) => handleLinkClick(e, section.id)}
                       class="block px-4 py-3 rounded-md text-sm font-medium
                              transition-colors duration-200
                              text-lt1 dark:text-dt1 hover:bg-lbg3/50 dark:hover:bg-dbg3/50
                              {activeSection === section.id
                                  ? 'bg-lbg3/30 dark:bg-dbg3/30 font-semibold'
                                  : ''}">
                        {section.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>
