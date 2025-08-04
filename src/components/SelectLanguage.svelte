<script lang="ts">
    import "$/app.css"

    import { onMount } from "svelte";


    import Select from "$components/Select.svelte";

    import { detectAndSetBrowserLanguage, getCurrentLocale, switchLanguage, onLanguageChange } from '$utils/languageDetection';

    let currentLanguage: string = $state('en');
    const optionClass = "text-sm dark:text-dtext text-ltext duration-300 bg-lbg2 dark:bg-dbg2";


    onMount(() => {
        // Detect and set browser language on page load
        detectAndSetBrowserLanguage();

        // Update current language state
        currentLanguage = getCurrentLocale();
        // console.log("Current language:", currentLanguage);

        // Subscribe to language changes
        const unsubscribe = onLanguageChange((newLocale) => {
            currentLanguage = newLocale;
            // console.log("Language changed to:", newLocale);
        });

        // Cleanup subscription on component destroy
        return unsubscribe;
    });

    function updateLanguage(event: Event) {
        const select = event.target as HTMLSelectElement;
        const newLanguage = select.value;
        switchLanguage(newLanguage);
        // currentLanguage will be updated by the onLanguageChange callback
    }

</script>

<Select bind:value={currentLanguage} onchange={updateLanguage}>
    {#snippet main()}
        <option class={optionClass} value="en">🇺🇸 English</option>
        <option class={optionClass} value="fr">🇫🇷 Français</option>
    {/snippet}
</Select>
