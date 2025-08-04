<script lang="ts">
    import "$/app.css"

    import { onMount } from "svelte";

    import Button from "$components/Button.svelte";

    import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages
    import { detectPreferredTheme, setTheme, toggleTheme } from '$utils/themeManager';

    interface ThemeButtonProps {
        darkMode: boolean;
    }
    let { darkMode = $bindable(true) }: ThemeButtonProps = $props();

    function handleThemeToggle() {
        const newTheme = toggleTheme();
        if (newTheme === null) {
            console.error("Failed to toggle theme");
            return;
        }
        darkMode = newTheme;
    }

    onMount(() => {
        // Detect and apply saved/preferred theme
        darkMode = detectPreferredTheme();

        // Apply theme whenever darkMode changes
        $effect(() => {
            setTheme(darkMode);
        });
    });

</script>

<Button text={darkMode ? "☀️ " + rm.theme_dark() : "🌙 " + rm.theme_light()} onclick={handleThemeToggle} />
