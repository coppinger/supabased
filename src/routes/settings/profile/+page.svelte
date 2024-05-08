<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { VALIDATIONS, profileSchema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';
	import Button from '$lib/components/shadcn/ui/button/button.svelte';
	import { dev } from '$app/environment';
	import * as Profile from '$lib/components/profile/index.js';
	import type { Writable } from 'svelte/store';
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

			if (!valid) {
				toast.error('Error', { description: message });
				console.log(form);
			}
			if (valid) toast.success('Success', { description: message });
		},
	});

	setContext('form', form);

	const file = fileProxy(form, 'pfp_url');
	const { form: formData, enhance, errors, constraints } = form;
	let profileState: Writable<PageData['user']['profile']['data']> | undefined;

	$: {
		if ($profileState?.availabilities && availabilities.data)
			$formData.availability = availabilities.data
				.filter((ele) => ele.name && $profileState?.availabilities?.includes(ele.name))
				.map((ele) => ele.id);
	}

	let isEditing: Writable<boolean>;
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
