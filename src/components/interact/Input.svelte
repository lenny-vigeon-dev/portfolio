<script lang="ts">
	import '$/app.css';

	import { text_sm, text_base, text_md, rounded_md } from '$utils/styles';
	import Label from '$components/Label.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface InputProps {
		title: string;
		placeHolder: string;
		id: string;
		name?: string;
		type?: HTMLInputAttributes['type'];
		value?: string;
		required?: boolean;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		disabled?: boolean;
		tabindex?: number;
	}

	let {
		title,
		placeHolder,
		id,
		name,
		type = 'text',
		value = $bindable(''),
		required = false,
		autocomplete,
		disabled = false,
		tabindex = 0
	}: InputProps = $props();
</script>

<div class="space-y-1">
	<Label _for={id} {title} />
	<input
		class={'border-input ring-offset-background \
        focus-visible:ring-ring flex w-full rounded-md border \
        file:border-0 file:bg-transparent file:text-sm file:font-medium \
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none \
        disabled:cursor-not-allowed disabled:opacity-50 ' +
			'border-gray-500 dark:border-gray-300 ' +
			'hover:border-lcol4 hover:dark:border-dcol4 ' +
			'h-10 px-3 py-2 ' +
			rounded_md +
			text_sm}
		{id}
		{name}
		{type}
		placeholder={placeHolder}
		{autocomplete}
		bind:value
		{required}
		{disabled}
		{tabindex}
	/>
</div>
