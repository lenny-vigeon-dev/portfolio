<script lang="ts">
	import emailjs from '@emailjs/browser';

	import InfoBlock from '$components/InfoBlock.svelte';
	import Input from '$components/interact/Input.svelte';
	import TextArea from '$components/interact/TextArea.svelte';
	import BlurryDiv from '$components/containers/BlurryDiv.svelte';
	import Phone from '$components/icons/Phone.svelte';
	import Location from '$components/icons/Location.svelte';
	import Send from '$components/icons/Send.svelte';
	import SectionTitle from '$components/SectionTitle.svelte';
	import Button from '$components/interact/Button.svelte';
	import Email from '$components/icons/Email.svelte';
	import Contract from '$components/icons/Contract.svelte';
	import Laptop from '$components/icons/Laptop.svelte';
	import {
		colored_title,
		h1_sizes,
		h2_sizes,
		h3_sizes,
		rounded_2xl,
		p_font_sizes_l,
		p_font_sizes_m,
		p_width,
		svg_scale
	} from '$utils/styles';
	import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages

	interface ContactProps {
		section_id?: string;
		tabIndex?: number;
	}

	let { section_id = 'contact', tabIndex = 0 }: ContactProps = $props();

	const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
	const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

	const emailJsConfigured = Boolean(
		EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID
	);

	let contactForm: HTMLFormElement | undefined;
	let sending = $state(false);
	let feedback: 'success' | 'error' | 'config' | null = $state(null);
	let senderName = $state('');
	let senderEmail = $state('');
	let senderSubject = $state('');
	let senderMessage = $state('');

	if (!emailJsConfigured) {
		feedback = 'config';
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!contactForm) {
			return;
		}

		if (!emailJsConfigured) {
			console.error('EmailJS environment variables are missing.');
			feedback = 'config';
			return;
		}

		sending = true;
		feedback = null;

		try {
			await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm, {
				publicKey: EMAILJS_PUBLIC_KEY
			});

			feedback = 'success';
			senderName = '';
			senderEmail = '';
			senderSubject = '';
			senderMessage = '';
			contactForm.reset();
		} catch (error) {
			console.error('Failed to send contact form via EmailJS.', error);
			feedback = 'error';
		} finally {
			sending = false;
		}
	}

	let icon_size16: number = $state(16);
	let icon_size24: number = $state(24);
	let icon_size32: number = $state(32);

	function resizeDependentFunctions() {
		// Update icon size on resize
		// These values are now static - consider using CSS for responsive sizing
		icon_size16 = 16;
		icon_size24 = 24;
		icon_size32 = 32;
	}
</script>

<section
	id={section_id}
	class="\ \
relative flex flex-col overflow-x-hidden
py-[5%] transition-all duration-300"
>
	<div class="container mx-auto max-w-[80%] 2xl:max-w-[40%]">
		<SectionTitle title={rm.contact_title()} subtitle={rm.contact_content()} />
		<div class="grid w-full grid-cols-1 gap-12">
			<div class="space-y-6">
				<InfoBlock title={rm.contract()} content={rm.contract_content()}>
					{#snippet svg()}
						<Contract size={icon_size32} />
					{/snippet}
				</InfoBlock>
				<InfoBlock
					title={rm.mobility() + ' & ' + rm.location()}
					content={rm.mobility_location_content()}
				>
					{#snippet svg()}
						<Location size={icon_size32} />
					{/snippet}
				</InfoBlock>
				<InfoBlock title={rm.work()} content={rm.work_content()}>
					{#snippet svg()}
						<Laptop size={icon_size32} />
					{/snippet}
				</InfoBlock>
			</div>

			<BlurryDiv animate={false}>
				{#snippet main()}
					<div class="flex flex-col space-y-1.5 p-6">
						<h3 class={'text-foreground font-semibold tracking-tight' + h3_sizes}>
							{rm.send_me_a_msg()}
						</h3>
					</div>
					<form bind:this={contactForm} class="space-y-6 p-6 pt-0" onsubmit={handleSubmit}>
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Input
								title={rm.name()}
								placeHolder={rm.name_placeholder()}
								id="name"
								name="user_name"
								bind:value={senderName}
								required
							/>
							<Input
								title={rm.email()}
								placeHolder={rm.email_placeholder()}
								id="email"
								name="user_email"
								type="email"
								bind:value={senderEmail}
								required
							/>
						</div>
						<Input
							title={rm.subject()}
							placeHolder={rm.subject_placeholder()}
							id="subject"
							name="subject"
							bind:value={senderSubject}
							required
						/>
						<TextArea
							title={rm.message()}
							placeHolder={rm.message_placeholder()}
							id="message"
							name="message"
							bind:value={senderMessage}
							required
						/>
						<Button
							text={sending ? rm.sending_msg() : rm.send_msg()}
							type="submit"
							disabled={sending || !emailJsConfigured}
						>
							{#snippet main()}
								<Send size={icon_size16} />
							{/snippet}
						</Button>
						{#if feedback}
							<p class="text-foreground/80 text-center text-sm">
								{#if feedback === 'success'}
									{rm.contact_success()}
								{:else if feedback === 'config'}
									{rm.contact_config_error()}
								{:else}
									{rm.contact_error()}
								{/if}
							</p>
						{/if}
					</form>
				{/snippet}
			</BlurryDiv>
		</div>
	</div>
</section>
