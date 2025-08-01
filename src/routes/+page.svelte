<script lang="ts">
    import "$/app.css"

    import { onMount } from "svelte";

    import {
        colored_title,
        animated500,
        h1_sizes,
        p_font_sizes,
        p_width
    } from "$utils/styles";
    import JumpingMouse from "$components/JumpingMouse.svelte";
    import Button from "$components/Button.svelte";

    import Email from "$components/logos/Email.svelte";
    import Linkedin from "$components/logos/Linkedin.svelte";
    import Github from "$components/logos/Github.svelte";
    import Download from "$components/logos/Download.svelte";

    import { detectAndSetBrowserLanguage, getCurrentLocale, switchLanguage, onLanguageChange } from '$utils/languageDetection';
    import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages
    import { detectPreferredTheme, setTheme, toggleTheme } from '$utils/themeManager';
	import type { ChangeEventHandler } from "svelte/elements";

    let darkMode = $state(true);
    let currentLanguage = $state('en');

    function handleThemeToggle() {
        const currentTheme = darkMode ? 'dark' : 'light';
        const newTheme = toggleTheme(currentTheme);
        darkMode = newTheme === 'dark';
    }

    onMount(() => {
        // Detect and apply saved/preferred theme
        const preferredTheme = detectPreferredTheme();
        darkMode = preferredTheme === 'dark';
        
        // Detect and set browser language on page load
        detectAndSetBrowserLanguage();

        // Update current language state
        currentLanguage = getCurrentLocale();
        console.log("Current language:", currentLanguage);

        // Subscribe to language changes
        const unsubscribe = onLanguageChange((newLocale) => {
            currentLanguage = newLocale;
            console.log("Language changed to:", newLocale);
        });

        // Apply theme whenever darkMode changes
        $effect(() => {
            const theme = darkMode ? 'dark' : 'light';
            setTheme(theme);
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


<section class={"transition-colors duration-300 min-h-screen relative flex items-center justify-center overflow-hidden bg-lbg dark:bg-dbg text-ltext dark:text-dtext "}>
    <div class="absolute inset-0">
        <div class="absolute top-4 right-4 flex gap-2">
            <Button text={darkMode ? "☀️ " + rm.theme_dark() : "🌙 " + rm.theme_light()} onclick={handleThemeToggle} />
            <select bind:value={currentLanguage} onchange={updateLanguage}>
                <option value="en">🇺🇸 English</option>
                <option value="fr">🇫🇷 Français</option>
            </select>
        </div>
    </div>
    <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class={colored_title + h1_sizes + animated500}>{rm.me_title()}</h1>
        <div class="max-w-4xl mx-auto">
            <p class={p_font_sizes + animated500 + p_width + "mb-8 mx-auto "}>{rm.me_mission()}</p>
            <div class="flex flex-wrap justify-center gap-4 mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
                <Button text={rm.me_contact()} logo={Email} />
                <Button text={rm.me_resume()} logo={Download} />
            </div>
            <div class="flex justify-center gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <Github _class="text-ltext dark:text-dtext" />
                </button>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <Linkedin _class="text-ltext dark:text-dtext" />
                </button>
            </div>
        </div>
    </div>
    <JumpingMouse />
</section>
