<script lang="ts">
	import { Button } from '$lib/components/shadcn/ui/button';
	import Checkbox from '$lib/components/shadcn/ui/checkbox/checkbox.svelte';
	import type { CreateProfilesState } from '$lib/stores/profiles';
	import { cn } from '$lib/components/shadcn/utils';
	import * as Tooltip from '$lib/components/shadcn/ui/tooltip';
	import { Input } from '$lib/components/shadcn/ui/input';
	import type { PageData } from '../../../routes/$types';
	import { supabaseProductIcons } from '../layouts/supabaseProductIcons';
	import * as Popover from '$lib/components/shadcn/ui/popover';
	import * as Command from '$lib/components/shadcn/ui/command';
	import { Label } from '$lib/components/shadcn/ui/label';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { Check } from 'phosphor-svelte';
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import Combox from '../combobox/combox.svelte';

	export let filter: ReturnType<CreateProfilesState>['filterBy'];
	export let availabilityTypes: PageData['availabilities'];
	export let stacks: PageData['stacks'];
	export let products: PageData['products'];

	let value = '';
	let open = false;
	let data = stacks.data?.map((stack) => ({ value: stack.name!, label: stack.name! }));
	let { supabase } = $page.data as PageData;

	$: open = !!value.length;
	$: selectedValue = data?.find((f) => f.value === value)?.label;
	$: if (value.length) searchStacks(value);
	else data = stacks.data?.map((stack) => ({ value: stack.name!, label: stack.name! }));
	$: if (selectedValue) {
		if (!$filter.stacks.some((stack) => stack === selectedValue))
			$filter.stacks.push(selectedValue);
		$filter = $filter;
	}

	async function searchStacks(search?: string) {
		if (!search) return;
		const { data: results, error } = await supabase
			.from('stacks')
			.select()
			.textSearch('name', `${search}:*`);
		if (!error) {
			data = results.map((stack) => ({ value: stack.name!, label: stack.name! }));
		} else {
			data = [];
		}
	}

	function handleFilter<T extends keyof typeof $filter>(
		filterStore: typeof filter,
		key: T,
		filterValue: NonNullable<(typeof $filter)[T]>[number] | null
	) {
		filterStore.update((val) => {
			if (val[key].includes(filterValue ?? '')) {
				const idx = val[key].findIndex((str) => str === filterValue);
				if (idx !== -1) val[key].splice(idx, 1);
			} else {
				val[key].push(filterValue ?? '');
			}
			return val;
		});
	}
</script>

<div class="flex w-[360px] flex-col gap-8 rounded-md py-8">
	<div class="flex flex-col gap-8">
		<div class="flex items-center gap-2">
			<p class="text-xl font-bold">Stacks</p>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<p class="material-symbols-outlined h-4 text-[16px] leading-none text-neutral-600">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Combox
			bind:data
			multiple
			bind:value={$filter.stacks}
			on:input={(e) => searchStacks(e.currentTarget.value)}
		/>
		<p class="font-bold text-neutral-50">Popular stacks</p>
		<div class="grid grid-cols-2 gap-4">
			{#await stacks}
				{#each [...Array(6)] as _}
					<div class="h-10 w-20 animate-pulse rounded bg-neutral-700" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="outline"
								class={cn('flex flex-wrap gap-4 shadow-sm shadow-neutral-800 backdrop-blur', {
									'text-primary': $filter.stacks.includes(name),
								})}
								on:click={() => handleFilter(filter, 'stacks', name)}
							>
								{name}
								<Checkbox
									class="ml-auto"
									tabindex={-1}
									checked={$filter['stacks'].includes(name)}
								/>
							</Button>
						{/if}
					{/each}
				{/if}
			{:catch err}
				{console.log('stacks error', err)}
			{/await}
		</div>
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex items-center gap-2">
			<p class="text-xl font-bold">Availability</p>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<p class="material-symbols-outlined h-4 text-[16px] leading-none text-neutral-600">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<div class="flex flex-wrap gap-4">
			{#await availabilityTypes}
				{#each [...Array(6)] as _}
					<div class="h-10 w-20 animate-pulse rounded bg-neutral-700" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="outline"
								class={cn('flex flex-wrap gap-4 shadow-sm shadow-neutral-800 backdrop-blur', {
									'text-primary': $filter.availibility.includes(name),
								})}
								on:click={() => handleFilter(filter, 'availibility', name)}
							>
								{name}
								<!-- <Checkbox tabindex={-1} checked={$filter['availibility'].includes(name)} /> -->
							</Button>
						{/if}
					{/each}
				{/if}
			{/await}
		</div>
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex items-center gap-2">
			<p class="text-xl font-bold">Supabase Experience</p>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<p class="material-symbols-outlined h-4 text-[16px] leading-none text-neutral-600">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<div class={cn('flex flex-wrap gap-4')}>
			{#await products}
				{#each [...Array(6)] as _}
					<div class="h-10 w-24 animate-pulse rounded bg-neutral-700" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="outline"
								class={cn('flex flex-wrap gap-4 shadow-sm shadow-neutral-800 backdrop-blur', {
									'text-primary': $filter.experiences.includes(name),
								})}
								on:click={() => handleFilter(filter, 'experiences', name)}
							>
								{#if name}
									{@const Icon = supabaseProductIcons[name]}
									{name}
									<svelte:component this={Icon} class="h-4 w-4" />
								{/if}
							</Button>
						{/if}
					{/each}
				{/if}
			{/await}
		</div>
	</div>
</div>
