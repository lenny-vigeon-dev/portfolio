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

    // Create a proxy that wraps all message functions to be reactive
    return new Proxy(m, {
        get(target, prop, receiver) {
            const originalValue = Reflect.get(target, prop, receiver);

            // If it's a function (i.e., a message function), wrap it to be reactive
            if (typeof originalValue === 'function') {
                return (...args: any[]) => {
                    // Reference updateTrigger to make this reactive
                    updateTrigger;
                    return originalValue(...args);
                };
            }

            // For non-function properties, return as-is
            return originalValue;
        }
    }) as typeof m;
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
