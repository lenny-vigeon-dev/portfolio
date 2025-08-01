const THEME_STORAGE_KEY = 'user-theme-preference';
const THEME_COOKIE_NAME = 'theme';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Gets the stored theme preference from cookies or localStorage
 */
export function getStoredTheme(): 'light' | 'dark' | null {
    // First try to get from cookies
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === THEME_COOKIE_NAME) {
                return value === 'dark' || value === 'light' ? value : null;
            }
        }
    }

    // Fallback to localStorage
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === 'dark' || stored === 'light' ? stored : null;
    }

    return null;
}

/**
 * Gets theme from cookie string (useful for SSR)
 */
export function getThemeFromCookieString(cookieString: string): 'light' | 'dark' | null {
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === THEME_COOKIE_NAME) {
            return value === 'dark' || value === 'light' ? value : null;
        }
    }
    return null;
}

/**
 * Saves the theme preference to both cookies and localStorage
 */
export function saveTheme(theme: 'light' | 'dark'): void {
    // Save to cookie with secure settings
    if (typeof document !== 'undefined') {
        document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure=${location.protocol === 'https:'}`;
    }

    // Save to localStorage as backup
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
}

/**
 * Detects the user's preferred theme from:
 * 1. Stored preference (cookies/localStorage)
 * 2. System preference (prefers-color-scheme)
 */
export function detectPreferredTheme(): 'light' | 'dark' {
    // First check if user has a stored preference
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }

    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Default to dark theme
    return 'dark';
}

/**
 * Applies the theme to the HTML element
 */
export function applyTheme(theme: 'light' | 'dark'): void {
    if (typeof document !== 'undefined') {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
}

/**
 * Sets the theme and saves the preference
 */
export function setTheme(theme: 'light' | 'dark'): void {
    applyTheme(theme);
    saveTheme(theme);
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(currentTheme: 'light' | 'dark'): 'light' | 'dark' {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    return newTheme;
}
