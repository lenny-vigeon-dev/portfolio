const THEME_STORAGE_KEY = 'user-theme-preference';
const THEME_COOKIE_NAME = 'theme';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds
const DARK_THEME_CLASS = 'dark';

/**
 * Gets the stored theme preference from cookies or localStorage
 */
export function getStoredTheme(): boolean | null {
	// First try to get from cookies
	if (typeof document !== 'undefined') {
		const cookies = document.cookie.split(';');
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split('=');
			if (name === THEME_COOKIE_NAME) {
				if (value === 'true') return true;
				if (value === 'false') return false;
				return null;
			}
		}
	}

	// Fallback to localStorage
	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'true') return true;
		if (stored === 'false') return false;
		return null;
	}

	return null;
}

/**
 * Saves the theme preference to both cookies and localStorage
 */
export function saveTheme(dark_mode: boolean): void {
	const str_bool = dark_mode ? 'true' : 'false';
	// Save to cookie with secure settings
	if (typeof document !== 'undefined') {
		document.cookie = `${THEME_COOKIE_NAME}=${str_bool}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure=${location.protocol === 'https:'}`;
	}

	// Save to localStorage as backup
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(THEME_STORAGE_KEY, str_bool);
	}
}

/**
 * Detects the user's preferred theme from:
 * 1. Stored preference (cookies/localStorage)
 * 2. System preference (prefers-color-scheme)
 */
export function detectPreferredTheme(): boolean {
	// First check if user has a stored preference
	const storedTheme: boolean | null = getStoredTheme();
	if (storedTheme !== null) {
		return storedTheme;
	}

	// Fall back to system preference
	if (typeof window !== 'undefined' && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	// Default to dark theme
	return true;
}

/**
 * Applies the theme to the HTML element
 */
export function applyTheme(dark_theme: boolean): void {
	if (typeof document !== 'undefined') {
		const html = document.documentElement;
		if (dark_theme) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}
}

/**
 * Sets the theme and saves the preference
 */
export function setTheme(dark_theme: boolean): void {
	applyTheme(dark_theme);
	saveTheme(dark_theme);
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): boolean | null {
	let isDark: boolean | null = null;

	if (typeof document !== 'undefined') {
		const html = document.documentElement;
		isDark = html.classList.toggle(DARK_THEME_CLASS);
		saveTheme(isDark);
	}
	return isDark;
}
