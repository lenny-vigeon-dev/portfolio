<script lang="ts">
    import "$/app.css"

    import { onMount } from "svelte";

    import Button from "$components/interact/Button.svelte";

    import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages
    import { detectPreferredTheme, setTheme, toggleTheme } from '$utils/themeManager';
    import { darkMode } from '$lib/stores/ui';

    function handleThemeToggle() {
        const newTheme = toggleTheme();
        if (newTheme === null) {
            console.error("Failed to toggle theme");
            return;
        }
        darkMode.set(newTheme);
    }
    const lightThemeTextFull = "☀️ " + rm.theme_dark();
    const darkThemeTextFull = "🌙 " + rm.theme_light();

    let lightThemeText = $state(lightThemeTextFull);
    let darkThemeText = $state(darkThemeTextFull);

    function resizeButton() {
        if (!window) return; // Exit if section not ready

		const w = window.innerWidth;
        // console.log(`Window width: ${w}`); // Debugging log

        if (w < 640) {
            lightThemeText = "☀️";
            darkThemeText = "🌙";
        } else {
            lightThemeText = lightThemeTextFull;
            darkThemeText = darkThemeTextFull;
        }
    }

    onMount(() => {
        // Detect and apply saved/preferred theme
        darkMode.set(detectPreferredTheme());

        // Apply theme whenever darkMode changes
        $effect(() => {
            setTheme($darkMode);
        });

        resizeButton();
        window.addEventListener('resize', resizeButton);
		return () => window.removeEventListener('resize', resizeButton);
    });

    interface ThemeButtonProps {
        tabindex?: number;
    }
    let { tabindex = 0 }: ThemeButtonProps = $props();

</script>

<Button text={$darkMode ? darkThemeText : lightThemeText} onclick={handleThemeToggle} tabindex={tabindex} />
