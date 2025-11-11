<script lang="ts">
	// Props interface
	interface HamburgerButtonProps {
		isOpen?: boolean;
		onToggle?: (event: MouseEvent) => void;
		tabindex?: number;
	}

	let {
		isOpen = false,
		onToggle = (event: MouseEvent) => {},
		tabindex = 0
	}: HamburgerButtonProps = $props();
</script>

<!-- Hamburger Button -->
<button
	class="relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1
           rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-lt2 dark:focus-visible:ring-dt2
           {isOpen ? '' : 'hover:space-y-1.5 focus:space-y-1.5'}"
	onclick={onToggle}
	aria-label="Toggle menu"
	aria-expanded={isOpen}
	{tabindex}
>
	<!-- Top line -->
	<span
		class="block h-0.5 w-6 bg-lt1 transition-all duration-200 dark:bg-dt1
                 {isOpen ? 'translate-y-1.5 rotate-45' : ''}"
	></span>

	<!-- Middle line -->
	<span
		class="block h-0.5 w-6 bg-lt1 transition-all duration-200 dark:bg-dt1
                 {isOpen ? 'opacity-0' : ''}"
	></span>

	<!-- Bottom line -->
	<span
		class="block h-0.5 w-6 bg-lt1 transition-all duration-200 dark:bg-dt1
                 {isOpen ? '-translate-y-1.5 -rotate-45' : ''}"
	></span>
</button>
