<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { Field, Control, Description, FieldErrors } from 'formsnap';
	import { toast } from 'svelte-sonner';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { VALIDATIONS, profileSchema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	// import { CircleCheck, XCircle } from 'lucide-svelte';
	import { CircleNotch } from 'phosphor-svelte';
	import { dev } from '$app/environment';
	import * as Profile from '$lib/components/profile/index.js';
	import type { Writable } from 'svelte/store';
	import type { ProfilesResult } from '$lib/db/query.js';
	import { setContext } from 'svelte';

	export let data: PageData;

	let { supabase, user, availabilities, products } = data;
	$: ({ supabase, user, availabilities, products } = data);

	let profile = user?.profile.data;
	$: if (user) profile = user.profile.data;

	const form = superForm(data.form, {
		validators: zodClient(profileSchema),
		validationMethod: 'oninput',
		dataType: 'json',
		onError: ({ result }) => {
			const { error } = result;
			toast.error(error.message);
		},
		onUpdated: ({ form }) => {
			const { valid, message } = form;
			if (!valid) toast.error('Error', { description: message });
			if (valid) toast.success('Success', { description: message });
		},
	});

	setContext('form', form);

	const file = fileProxy(form, 'pfp_url');
	const { form: formData, enhance, errors, constraints } = form;
	let profileState: Writable<ProfilesResult> | undefined;

	$: {
		if ($profileState?.availabilities && availabilities.data)
			$formData.availability = availabilities.data
				.filter((ele) => ele.name && $profileState?.availabilities?.includes(ele.name))
				.map((ele) => ele.id);
	}
	$: {
		if ($profileState?.products && products.data)
			$formData.products = products.data
				.filter((ele) => ele.name && $profileState?.products?.includes(ele.name))
				.map((ele) => ele.id);
	}

	let checking = false;
	let isEditing: Writable<boolean>;

	let timer: ReturnType<typeof setTimeout>;
	const debounce = () => {
		if (!isUsernameLengthGreaterThanMinContrainst()) return;

		checking = true;
		clearTimeout(timer);
		timer = setTimeout(async () => {
			await handleUsernameChange($formData.username);
			checking = false;
		}, 750);
	};

	async function handleUsernameChange(username?: string) {
		if (!username) return;
		const { data, error } = await supabase
			.from('profiles')
			.select('username')
			.eq('username', username)
			.maybeSingle();
		if (data) {
			$errors.username = [VALIDATIONS.USERNAME.FAIL];
		}
	}

	// putting the Java in JavaScript am I right? haha you can thank devdad smh.
	function isUsernameLengthGreaterThanMinContrainst() {
		if (!$formData.username) return;
		const { length } = $formData.username;
		return !($constraints.username?.minlength && length < $constraints.username.minlength);
	}
</script>

<div class="absolute right-4 top-[6.5rem] min-w-96">
	<SuperDebug data={$formData} display={dev} />
</div>
<form
	method="post"
	action="?/profile"
	enctype="multipart/form-data"
	class="flex flex-col gap-6"
	use:enhance
>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<div class="flex items-center gap-2">
				<p class="text-muted-foreground">@</p>
				<Input {...attrs} bind:value={$formData.username} on:input={debounce} />
			</div>
		</Form.Control>
		<Form.Description>
			{#if checking && !$errors.username}
				<div class="flex items-center gap-2 text-muted-foreground">
					<CircleNotch class="animate-spin" size="1rem" />
					<p>Checking username availability...</p>
				</div>
			{:else if !checking && !$errors.username?.length && isUsernameLengthGreaterThanMinContrainst()}
				<div class="flex items-center gap-2 text-green-500">
					<p>{VALIDATIONS.USERNAME.SUCCESS}</p>
				</div>
			{/if}
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	{#if profile}
		<Profile.Root {profile} allowEditing bind:isEditing bind:profileState>
			<Profile.Header />
			{#await availabilities then { data }}
				{#if data}
					<Profile.Availability availabilities={data} />
				{/if}
			{/await}
		</Profile.Root>
	{/if}

	<!-- <Form.Field {form} name="pfp_url">
		<Form.Control let:attrs>
			<Form.Label>Profile picture</Form.Label>
			<Input {...attrs} type="file" bind:files={$file} />
		</Form.Control>
		<Form.Description>Select a spiffy picture of yourself ^_^</Form.Description>
		<Form.FieldErrors />
	</Form.Field> -->
	<div class="flex flex-col gap-2">
		<Button variant="outline" on:click={() => ($isEditing = !$isEditing)}>
			{!$isEditing ? 'Edit Profile' : 'Save Profile'}
		</Button>
		<Button type="submit">Submit</Button>
	</div>
</form>
