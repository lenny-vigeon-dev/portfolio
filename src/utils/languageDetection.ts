import { getLocale, setLocale, locales } from '$lib/paraglide/runtime.js';

const LANGUAGE_STORAGE_KEY = 'user-language-preference';

// Create a simple reactive store for language changes
let languageChangeCallbacks: Array<(newLocale: string) => void> = [];

/**
 * Subscribe to language changes
 */
export function onLanguageChange(callback: (newLocale: string) => void): () => void {
    languageChangeCallbacks.push(callback);

    // Return unsubscribe function
    return () => {
        languageChangeCallbacks = languageChangeCallbacks.filter(cb => cb !== callback);
    };
}

/**
 * Notify all subscribers of language change
 */
function notifyLanguageChange(newLocale: string): void {
    languageChangeCallbacks.forEach(callback => callback(newLocale));
}

/**
 * Detects the user's preferred language from browser settings
 * and sets it if it's supported by the application.
 * Respects user's previous manual choice if stored.
 */
export function detectAndSetBrowserLanguage(): void {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return;
    }

    // Check if user has a stored language preference
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && locales.includes(storedLanguage as any)) {
        setLocale(storedLanguage as any, { reload: false });
        notifyLanguageChange(storedLanguage);
        return;
    }

    // Get current locale to avoid unnecessary updates
    let currentLocale: string;
    try {
        currentLocale = getLocale();
    } catch {
        // No locale set yet, proceed with detection
        currentLocale = '';
    }

    // Get user's preferred languages from browser
    const browserLanguages = navigator.languages || [navigator.language];

    // Find the first supported language
    const supportedLanguage = findSupportedLanguage(browserLanguages);

    if (supportedLanguage && supportedLanguage !== currentLocale) {
        // Set the locale without reloading the page since we're doing this on initial load
        setLocale(supportedLanguage as any, { reload: false });
        notifyLanguageChange(supportedLanguage);
    }
}

/**
 * Finds the first browser language that is supported by the application
 */
function findSupportedLanguage(browserLanguages: readonly string[]): string | null {
    const availableLocales = locales;

    for (const browserLang of browserLanguages) {
        // Try exact match first (e.g., "en-US" -> "en")
        const exactMatch = availableLocales.find(locale => locale === browserLang);
        if (exactMatch) {
            return exactMatch;
        }

        // Try language code only (e.g., "en-US" -> "en", "fr-CA" -> "fr")
        const langCode = browserLang.split('-')[0];
        const langMatch = availableLocales.find(locale => locale === langCode);
        if (langMatch) {
            return langMatch;
        }
    }

    return null;
}

/**
 * Gets the current locale with fallback
 */
export function getCurrentLocale(): string {
    try {
        return getLocale();
    } catch {
        return 'en'; // fallback to English
    }
}

/**
 * Switches to the specified language and stores the preference
 */
export function switchLanguage(newLocale: string): void {
    if (locales.includes(newLocale as any)) {
        setLocale(newLocale as any, { reload: false });
        // Store user's manual choice
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale);
        // Notify all subscribers
        notifyLanguageChange(newLocale);
    }
}
