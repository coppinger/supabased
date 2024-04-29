<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';
	import { projectSchema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { cn } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import type { Tables } from '$lib/types/DatabaseDefinitions.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { dev } from '$app/environment';
	import Combox from '$lib/components/combobox/combox.svelte';

	export let data: Pick<
		Tables<'projects'>,
		'profile_id' | 'project_name' | 'project_url' | 'repository_url' | 'id'
	> & { isRepo?: boolean };

	const form = superForm(($page.data as PageData).form, {
		validators: zodClient(projectSchema),
		id: data.id,
		invalidateAll: true,
		dataType: 'json',
		onError: ({ result }) => {
			const { error } = result;
			toast.error(error.message);
		},
	});

	const { form: formData, enhance, errors, constraints } = form;
	const { project_name, project_url, repository_url } = data;

	if (project_name) $formData.project_name = project_name;
	if (project_url) $formData.project_url = project_url;
	if (repository_url) $formData.repository_url = repository_url;

	$: ({ products, supabase } = $page.data as PageData);

	let stacks: { value: string; label: string }[] = [];
	async function searchStacks(search: string) {
		if (!search) {
			stacks = [];
			return;
		}
		const { data, error } = await supabase
			.from('stacks')
			.select()
			.textSearch('name', search + ':*');
		if (!error) stacks = data.map((stack) => ({ value: stack.name!, label: stack.name! }));
		else {
			console.log(error);
			stacks = [];
		}
		console.log(stacks);
	}
</script>

<div class="absolute left-1/2 top-0 -translate-x-1/2 translate-y-[-12rem]">
	<SuperDebug data={$formData} display={dev} />
</div>

<form method="post" enctype="multipart/form-data" class="flex flex-col gap-4" use:enhance>
	<Form.Field {form} name="project_name">
		<Form.Control let:attrs>
			<Form.Label>Project Name</Form.Label>
			<Input {...attrs} bind:value={$formData.project_name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="project_url">
		<Form.Control let:attrs>
			<Form.Label>Project Website</Form.Label>
			<Input {...attrs} bind:value={$formData.project_url} />
		</Form.Control>
		<Form.Description>This is your landing page for your project.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="repository_url">
		<Form.Control let:attrs>
			<Form.Label>Repository URL</Form.Label>
			<Input {...attrs} bind:value={$formData.repository_url} />
		</Form.Control>
		<Form.Description>Github Repo</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="stacks">
		<Form.Control let:attrs>
			<Form.Label>Stacks</Form.Label>
			<Combox
				bind:data={stacks}
				multiple
				{...attrs}
				bind:value={$formData.stacks}
				on:input={(e) => searchStacks(e.currentTarget.value)}
			/>
		</Form.Control>
		<Form.Description>Stacks used in project</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	{#if products.data}
		<Form.Field {form} name="products">
			<Form.Control let:attrs>
				<Form.Label>Products</Form.Label>
				<Combox
					data={products.data.map((product) => ({
						value: product.name || '',
						label: product.name || '',
					}))}
					multiple
					{...attrs}
					bind:value={$formData.products}
				/>
			</Form.Control>
			<Form.Description>Products used in project</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{/if}
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>
			<span> Short description of your project </span>
			{#if $constraints.description?.maxlength && $formData.description?.length}
				<p
					class={cn('text-muted-foreground', {
						'text-destructive': $formData.description?.length > $constraints.description?.maxlength,
					})}
				>
					{$formData.description?.length}/{$constraints.description?.maxlength}
				</p>
			{/if}
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<slot />
</form>
