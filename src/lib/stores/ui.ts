import { writable } from 'svelte/store';

import type { SectionData } from '$utils/interfaces';

// Store pour contrôler la visibilité du header
export const headerVisible = writable(false);
export const darkMode = writable(true);
export const sections = writable<SectionData[]>([]);
export const headerTabIndex = writable(2);

// Store pour le menu hamburger
export const hamburgerOpen = writable(false);
export const activeSection = writable('');
