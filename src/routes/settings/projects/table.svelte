<script lang="ts" generics="T extends Tables<'projects'>, U extends PageData['repos'][number]">
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import { deleteUserProjectByRepoUrl } from '$lib/db/helpers';
	import { page } from '$app/stores';
	import { cn } from '$lib/components/shadcn/utils';
	import type { PageData } from './$types';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/shadcn/ui/table';
	import TableActions from './table-actions.svelte';
	import { addPagination, addTableFilter, addSelectedRows } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/shadcn/ui/button';
	import { Input } from '$lib/components/shadcn/ui/input';
	import TableCheckbox from './table-checkbox.svelte';

	export let projects: T[];
	export let repos: U[];

	type Combined = (T & { isRepo?: boolean })[];
	const filtered: Combined = repos
		.filter((repo) => !projects.some((project) => project.repository_url === repo.html_url))
		.map((repo) => ({
			id: repo.id.toString(),
			project_name: repo.name,
			project_url: repo.homepage ?? '',
			repository_url: repo.html_url,
			profile_id: $page.data.session?.user.id ?? null,
			isRepo: true,
		})) as Combined;

	const data: Combined = projects.concat(filtered);

	const table = createTable(readable(data), {
		page: addPagination(),
		select: addSelectedRows(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
		}),
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(TableCheckbox, {
					checked: allPageRowsSelected,
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(TableCheckbox, {
					checked: isSelected,
				});
			},
			plugins: {
				filter: {
					exclude: true,
				},
			},
		}),
		table.column({
			accessor: 'project_name',
			header: 'Name',
		}),
		table.column({
			accessor: 'project_url',
			header: 'Website',
		}),
		table.column({
			accessor: 'repository_url',
			header: 'Repository',
		}),
		table.column({
			accessor: (val) => val,
			header: '',
			cell: ({ value }) => createRender(TableActions, { value }),
			plugins: {
				filter: {
					exclude: true,
				},
			},
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;
</script>

<div class="flex items-center py-4">
	<Input class="max-w-sm" placeholder="Filter projects..." type="text" bind:value={$filterValue} />
</div>
<div class="rounded-lg border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row
						{...rowAttrs}
						data-state={$selectedDataIds[row.id] && 'selected'}
						class={cn({
							'bg-red-500 bg-opacity-20': row.isData() && row.original.isRepo,
						})}
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.isData() && (cell.id === 'project_url' || cell.id === 'repository_url') && typeof cell.value === 'string'}
										<a href={cell.value} target="_blank"><Render of={cell.render()} /></a>
									{:else if cell.isData() && cell.value}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="flex items-center justify-end space-x-4 py-4">
	<div class="flex-1 text-sm text-muted-foreground">
		{Object.keys($selectedDataIds).length} of{' '}
		{$rows.length} row(s) selected.
		<Button
			size="sm"
			variant="destructive"
			class={cn('ml-2 select-none', {})}
			on:click={async () => {
				const { data, error } = await deleteUserProjectByRepoUrl(
					$page.data.supabase,
					Object.keys($selectedDataIds).map((id) => $rows[id].original.repository_url)
				);
				if (error) console.log(error);
				if (data?.length) toast.success('Deleted projects');
				invalidateAll();
			}}
			disabled={!Object.keys($selectedDataIds).length}>Delete</Button
		>
	</div>
	<Button
		variant="outline"
		size="sm"
		on:click={() => ($pageIndex = $pageIndex - 1)}
		disabled={!$hasPreviousPage}>Previous</Button
	>
	<Button
		variant="outline"
		size="sm"
		disabled={!$hasNextPage}
		on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
	>
</div>
