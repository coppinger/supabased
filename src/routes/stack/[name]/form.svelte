<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Combox from '$lib/components/combobox/combox.svelte';
	import { tags } from '$lib/stacks';

	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };

	export let username: string;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form }) => {
			if (!form.valid) toast.error('Error', { description: form.message });
			if (form.valid) toast.success('Submitted!');
		},
		onError: ({ result }) => {
			// TODO handle error event
		},
		onSubmit: ({ formData }) => {
			const t = formData.get('tags');
			console.log(t);
		}
	});

	let selected: string[] = [];

	$: $formData.tags = selected?.join(',');
	const { form: formData, enhance } = form;

	$formData.username = username;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="stackname">
		<Form.Control let:attrs>
			<Form.Label>Stack Name</Form.Label>
			<Input {...attrs} bind:value={$formData.stackname} />
		</Form.Control>
		<Form.Description>Name of the tech stack we missed.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="url">
		<Form.Control let:attrs>
			<Form.Label>Url</Form.Label>
			<Input {...attrs} bind:value={$formData.url} />
		</Form.Control>
		<Form.Description>Url link to stack (ex. 'https://orm.drizzle.team/')</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label>Tags</Form.Label>
			<Combox
				multiple={true}
				data={tags.map((tag) => ({
					label: tag,
					value: tag.toLowerCase()
				}))}
				bind:selected
			/>
			<Input {...attrs} bind:value={$formData.tags} type="hidden" />
		</Form.Control>
		<Form.Description>Add your tags</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Input type="hidden" {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
