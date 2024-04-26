<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

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
	import Table from './table.svelte';

	export let data: PageData;

	let { repos, projects } = data;
	$: ({ repos, projects } = data);

	let projectForm: HTMLFormElement;

	const form = superForm(data.form, {
		validators: zodClient(projectSchema),
		dataType: 'json',
		onError: ({ result }) => {
			const { error } = result;
			toast.error(error.message);
		}
	});

	const { form: formData, enhance, errors } = form;
</script>

<!-- <div class="absolute right-4 min-w-96 top-[6.5rem]">
	<SuperDebug data={$formData} display={dev} />
</div> -->

{#if projects.data}
	<div class="container">
		<Table projects={projects.data} {repos} />
	</div>
{/if}
