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
		event.stopPropagation(); // Prevent event from bubbling up
		onNavigate(sectionId);
		onToggle(); // Close menu after navigation
	}

	// Détection du clic à l'extérieur du menu
	function handleClickOutside(event: Event) {
		if (!isOpen) return; // Don't process if menu is already closed

		if (menuElement && !menuElement.contains(event.target as Node)) {
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
		if (!isOpen) return; // Don't process if menu is already closed

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
	<div
		class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
		role="button"
		tabindex="-1"
		onclick={onToggle}
		onkeydown={(e) => e.key === 'Escape' && onToggle()}
		aria-label="Close menu"
	></div>
{/if}
<!-- Mobile Menu -->
<div
	bind:this={menuElement}
	onfocusout={handleFocusOut}
	class="fixed top-16 right-2 z-40 min-w-48 origin-top-right
            rounded-lg border border-lbg2/20 bg-lbg4/95
            shadow-lg backdrop-blur-md transition-all
            duration-300 dark:border-dbg2/20 dark:bg-dbg4/95
            {isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}"
>
	<nav class="p-2">
		<ul class="space-y-1">
			{#each sections as section}
				<li>
					<a
						href="#{section.id}"
						tabindex={isOpen ? tabindex : -1}
						onclick={(e) => handleLinkClick(e, section.id)}
						class="block rounded-md px-4 py-3 text-sm font-medium
                              text-lt1 transition-colors
                              duration-200 hover:bg-lbg3/50 dark:text-dt1 dark:hover:bg-dbg3/50
                              {activeSection === section.id ? 'font-semibold' : ''}"
					>
						{section.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
