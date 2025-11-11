<script lang="ts">
	import '$/app.css';

	import { text_sm, rounded_md } from '$utils/styles';
	import Label from '$components/Label.svelte';

	interface TextAreaProps {
		title: string;
		placeHolder: string;
		id: string;
		name?: string;
		value?: string;
		required?: boolean;
		rows?: number;
		disabled?: boolean;
		tabindex?: number;
	}

	let {
		title,
		placeHolder,
		id,
		name,
		value = $bindable(''),
		required = false,
		rows = 6,
		disabled = false,
		tabindex = 0
	}: TextAreaProps = $props();
</script>

<div class="flex flex-col space-y-1">
	<Label _for={id} {title} />
	<textarea
		class={'min-h-[120px] w-full ' +
			'flex border transition-all duration-200 ' +
			'border-gray-500 dark:border-gray-300 ' +
			'hover:border-lcol4 hover:dark:border-dcol4 ' +
			'focus-visible:ring focus-visible:outline-none ' +
			'disabled:cursor-not-allowed disabled:opacity-50 ' +
			rounded_md +
			' ' +
			text_sm +
			' px-3 py-2'}
		{id}
		{name}
		placeholder={placeHolder}
		bind:value
		{rows}
		{required}
		{disabled}
		{tabindex}
	></textarea>
</div>
