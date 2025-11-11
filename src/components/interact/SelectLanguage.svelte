<script lang="ts">
	import '$/app.css';

	import { onMount } from 'svelte';

	import Select from '$components/interact/Select.svelte';

	import {
		detectAndSetBrowserLanguage,
		getCurrentLocale,
		switchLanguage,
		onLanguageChange
	} from '$utils/languageDetection';

	let currentLanguage: string = $state('en');
	const optionClass =
		'dark:text-dt3 text-lt3 \
    duration-300 bg-lbg2 dark:bg-dbg2';

	const enTextFull = 'English';
	const frTextFull = 'Français';
	const krTextFull = '한국어';

	let enText = $state(enTextFull);
	let frText = $state(frTextFull);
	let krText = $state(krTextFull);

	function resizeButton() {
		if (!window) return; // Exit if section not ready

		const w = window.innerWidth;

		if (w < 640) {
			enText = 'en';
			frText = 'fr';
			krText = 'kr';
		} else {
			enText = enTextFull;
			frText = frTextFull;
			krText = krTextFull;
		}
	}

	function updateLanguage(event: Event) {
		const select = event.target as HTMLSelectElement;
		const newLanguage = select.value;
		switchLanguage(newLanguage);
		// currentLanguage will be updated by the onLanguageChange callback
	}

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
		resizeButton();
		window.addEventListener('resize', resizeButton);
		return () => {
			unsubscribe();
			window.removeEventListener('resize', resizeButton);
		};
	});

	interface SelectLanguageProps {
		tabindex?: number;
	}
	let { tabindex = 0 }: SelectLanguageProps = $props();
</script>

<Select bind:value={currentLanguage} onchange={updateLanguage} {tabindex}>
	{#snippet main()}
		<option class={optionClass} value="en">🇺🇸 {enText}</option>
		<option class={optionClass} value="fr">🇫🇷 {frText}</option>
		<!-- <option class={optionClass} value="kr">🇰🇷 {krText}</option> -->
	{/snippet}
</Select>
