<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { Field, Control, Description, FieldErrors } from 'formsnap';

	import toast from 'svelte-french-toast';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { projectSchema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	import { dev } from '$app/environment';

	export let data: PageData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let projectForm: HTMLFormElement;
	let loading = false;
	// let description: string = project?.description ?? '';
	// let project_url: string = project?.project_url ?? '';

	const form = superForm(data.form, {
		validators: zodClient(projectSchema),
		onError: ({ result }) => {
			const { error } = result;
			toast.error(error.message);
		}
	});
	const { form: formData, enhance, errors } = form;
</script>

<div class="absolute right-4 min-w-96 top-[6.5rem]">
	<SuperDebug data={$formData} display={dev} />
</div>

<form
	method="POST"
	enctype="multipart/form-data"
	class="flex flex-col gap-4"
	use:enhance
	bind:this={projectForm}
>
	<Form.Field {form} name="project_name">
		<Form.Control let:attrs>
			<Form.Label>Project name</Form.Label>
			<Input {...attrs} bind:value={$formData.project_name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="project_url">
		<Form.Control let:attrs>
			<Form.Label>Project website</Form.Label>
			<Input {...attrs} bind:value={$formData.project_url} />
		</Form.Control>
		<Form.Description
			>If your project has a website, slap the URL in here (with the https:// part!).</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Project description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>Describe your project as shortly and succinctly as possible.</Form.Description
		>
		<p
			class={cn($formData.description?.length > 160 ? 'text-destructive' : 'text-muted-foreground')}
		>
			{$formData.description.length}/160
		</p>
		<Form.FieldErrors />
	</Form.Field>

	<Button type="submit">Submit</Button>
	<Button
		variant="secondary"
		on:click={() => {
			$formData.project_name = 'test';
			$formData.project_url = 'https://test.com';
			$formData.description = 'test';
		}}>Test data</Button
	>
</form>
