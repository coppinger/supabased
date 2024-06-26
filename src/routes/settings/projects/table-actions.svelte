<script lang="ts">
	import { DotsThree } from 'phosphor-svelte';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import { Button } from '$lib/components/shadcn/ui/button';
	import * as AlertDialog from '$lib/components/shadcn/ui/alert-dialog';
	import { deleteUserProject } from '$lib/db/helpers';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { invalidateAll } from '$app/navigation';
	import * as Dialog from '$lib/components/shadcn/ui/dialog/index.js';
	import Form from './form.svelte';
	export let value: Tables<'projects'> & { isRepo?: boolean };
	const { id, isRepo } = value;

	async function handleDelete() {
		const { data, error } = await deleteUserProject($page.data.supabase, id);
		if (error) console.log(error);
		if (data) toast.info(`Deleted ${data[0].project_name}`);

		await invalidateAll();
	}
</script>

<Dialog.Root>
	<AlertDialog.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
					<span class="sr-only">Open menu</span>
					<DotsThree class="h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Group>
					<DropdownMenu.Label>Actions</DropdownMenu.Label>
					{#if value.project_url}
						<DropdownMenu.Item href={value.project_url} target="_blank">
							Go to Website
						</DropdownMenu.Item>
					{/if}
					{#if value.repository_url}
						<DropdownMenu.Item href={value.repository_url} target="_blank">
							Go to Repository
						</DropdownMenu.Item>
					{/if}
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					{#if isRepo}
						<Dialog.Trigger class="size-full">
							<DropdownMenu.Item>Add to Projects</DropdownMenu.Item>
						</Dialog.Trigger>
					{:else}
						<Dialog.Trigger class="size-full">
							<DropdownMenu.Item>Edit</DropdownMenu.Item>
						</Dialog.Trigger>
						<AlertDialog.Trigger class="size-full">
							<DropdownMenu.Item>Delete Project</DropdownMenu.Item>
						</AlertDialog.Trigger>
					{/if}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your project from your account.
					You would have to manually add it back later.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action class="bg-destructive" on:click={handleDelete}
					>Continue</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit project</Dialog.Title>
			<Dialog.Description>
				Make changes to your project here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form data={value}>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</Form>
	</Dialog.Content>
</Dialog.Root>
