import * as m from '$lib/paraglide/messages.js';
import { onLanguageChange } from './languageDetection.js';

/**
 * Creates a reactive wrapper around Paraglide messages that automatically
 * updates when the language changes, without needing to manually define each message.
 */
export function createReactiveMessages() {
    let updateTrigger = $state(0);

    // Subscribe to language changes and trigger updates
    if (typeof window !== 'undefined') {
        onLanguageChange(() => {
            updateTrigger++;
        });
    }

    // Create reactive wrappers for each message function
    const reactiveMessages = {} as typeof m;

    for (const key in m) {
        const originalFunction = (m as any)[key];
        if (typeof originalFunction === 'function') {
            (reactiveMessages as any)[key] = (...args: any[]) => {
                // Reference updateTrigger to make this reactive
                updateTrigger;
                return originalFunction(...args);
            };
        } else {
            (reactiveMessages as any)[key] = originalFunction;
        }
    }

    return reactiveMessages;
}

/**
 * Reactive messages instance - ready to use!
 * This is a drop-in replacement for the regular Paraglide messages import.
 *
 * Usage:
 * Instead of: import * as m from '$lib/paraglide/messages.js'
 * Use: import { rm } from '$utils/reactiveMessages'
 */
export const rm = createReactiveMessages();
