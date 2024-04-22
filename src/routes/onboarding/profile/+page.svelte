<!-- <script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { Field, Control, Description, FieldErrors } from 'formsnap';

	import toast from 'svelte-french-toast';

	import { error } from '@sveltejs/kit';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { profileSchema } from './profileSchema.js';
	import SuperDebug from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	import { CircleCheck, XCircle } from 'lucide-svelte';
	import { CircleNotch } from 'phosphor-svelte';

	export let data: PageData;
    
	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let displayName: string = profile?.display_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let pfpUrl: string = profile?.pfp_url ?? '';

	const form = superForm(data.form, {
		validators: zodClient(profileSchema),
		onError: ({ result }) => {
			const { error } = result;
			toast.error(error.message);
		}
	});
	const { form: formData, enhance, errors } = form;

	const file = fileProxy(form, 'pfp_url');

	let url: File | string;

	let timer: ReturnType<typeof setTimeout>;

	let usernameUnavailable: boolean;
	let usernameCheckLoading: boolean = false;

	const debounce = () => {
		usernameCheckLoading = true;
		usernameUnavailable = false;
		clearTimeout(timer);
		timer = setTimeout(() => {
			handleUsernameChange($formData.username);
			usernameCheckLoading = false;
		}, 750);
	};

	async function handleUsernameChange(username: string) {
		const { data, error: errorUsername } = await supabase
			.from('profiles')
			.select('username')
			.eq('username', username)
			.maybeSingle();

		if (errorUsername) {
			console.log(errorUsername);
			error(500, 'Error fetching username');
		}

		usernameUnavailable = !!data;
	}
</script>

<SuperDebug data={$formData} />

<form
	method="POST"
	enctype="multipart/form-data"
	class="flex flex-col gap-4"
	use:enhance
	bind:this={profileForm}
>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<div class="flex items-center gap-2">
				<p class="text-muted-foreground">@</p>
				<Input {...attrs} bind:value={$formData.username} on:keyup={() => debounce()} />
			</div>
		</Form.Control>
		{#if usernameCheckLoading && $formData.username.length > 3}
			<div class="flex items-center gap-2 text-muted-foreground">
				<CircleNotch class="animate-spin" size="1rem" />
				<p>Checking username availability...</p>
			</div>
		{:else if $formData.username.length > 3}
			{#if usernameUnavailable === true}
				<div class="flex items-center gap-2 text-red-500">
					<XCircle size="1rem" />
					<p>That username is already taken.</p>
				</div>
			{:else if usernameUnavailable === false}
				<div class="flex items-center gap-2 text-green-500">
					<CircleCheck size="1rem" />
					<p>Nice, that username is available.</p>
				</div>
			{/if}
		{/if}
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="display_name">
		<Form.Control let:attrs>
			<Form.Label>Display name</Form.Label>
			<Input {...attrs} bind:value={$formData.display_name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="geopgrahical_location">
		<Form.Control let:attrs>
			<Form.Label>Location</Form.Label>

			<Input {...attrs} bind:value={$formData.geopgrahical_location} />
		</Form.Control>
		<Form.Description>Where you're located; be as specific (or not) as you'd like.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea {...attrs} bind:value={$formData.bio} />
		</Form.Control>
		<Form.Description>Let everyone know a little bit about you.</Form.Description>
		<p class={cn($formData.bio.length > 160 ? 'text-destructive' : 'text-muted-foreground')}>
			{$formData.bio.length}/160
		</p>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dream">
		<Form.Control let:attrs>
			<Form.Label>Dream</Form.Label>
			<Textarea {...attrs} bind:value={$formData.dream} />
		</Form.Control>
		<Form.Description>Alright, in 160 or less characters, what's your dream?</Form.Description>
		<p class={cn($formData.dream.length > 160 ? 'text-destructive' : 'text-muted-foreground')}>
			{$formData.dream.length}/160
		</p>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="pfp_url">
		<Form.Control let:attrs>
			<Form.Label>Profile picture</Form.Label>
			<Input {...attrs} isFileType={true} bind:files={$file} />
		</Form.Control>
		<Form.Description>Select a spiffy picture of yourself ^_^</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit">Submit</Button>
</form> -->
