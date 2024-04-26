<script lang="ts">
	import { DotsThree } from 'phosphor-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { deleteUserProject, insertUserProject } from '$lib/db/helpers';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { invalidateAll } from '$app/navigation';

	export let value: Tables<'projects'> & { isRepo?: boolean };
	const { id, isRepo } = value;

	async function handleDelete() {
		const { data, error } = await deleteUserProject($page.data.supabase, id);
		if (data)
			toast.info(`Deleted ${data.project_name}`, {
				action: {
					label: 'Undo',
					onClick: async () => {
						const { data: insert, error } = await insertUserProject($page.data.supabase, data);
						if (error) toast.error('Error undoing project deletion');
						if (insert)
							toast.info(`${insert.project_name} is back`, {
								description: 'Please re-enter all missing metadata'
							});
						await invalidateAll();
					}
				}
			});

		await invalidateAll();
	}
</script>

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
				<!-- <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
					Copy payment ID
				</DropdownMenu.Item> -->
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			{#if !isRepo}
				<DropdownMenu.Item>
					<AlertDialog.Trigger>Delete Project</AlertDialog.Trigger>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item>Add to Projects</DropdownMenu.Item>
			{/if}
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
			<AlertDialog.Action on:click={handleDelete}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content></AlertDialog.Root
>
