<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import type { CreateProfilesState } from '$lib/stores/profiles';
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from '../../../routes/$types';
	import { supabaseProductIcons } from '../layouts/supabaseProductIcons';
	export let filter: ReturnType<CreateProfilesState>['filter'];
	export let availabilityTypes: PageData['availabilityTypes'];
	export let stacks: PageData['stacks'];
	export let products: PageData['products'];

	let value = '';

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

<div class="flex flex-col gap-8 p-8 w-[360px] rounded-md">
	<div class="flex flex-col gap-8">
		<div class="flex items-center gap-2">
			<p class="text-xl font-bold">Stacks</p>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Input placeholder="Search stacks..." bind:value />
		<p class="text-neutral-50 font-bold">Popular stacks</p>
		<div class="flex gap-4 flex-wrap">
			{#await stacks}
				{#each [...Array(10)] as _}
					<div class="animate-pulse bg-neutral-700 h-10 w-20 rounded" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="filter"
								class="flex gap-4"
								on:click={() => handleFilter(filter, 'stacks', name)}
							>
								{name}
								<Checkbox tabindex={-1} checked={$filter['stacks'].includes(name)} />
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
					<p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<div class="flex gap-4 flex-wrap">
			{#await availabilityTypes}
				{#each [...Array(6)] as _}
					<div class="animate-pulse bg-neutral-700 h-10 w-20 rounded" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="filter"
								class="flex gap-4"
								on:click={() => handleFilter(filter, 'availibility', name)}
							>
								{name}
								<Checkbox tabindex={-1} checked={$filter['availibility'].includes(name)} />
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
					<p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
						info
					</p>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<div class={cn('flex gap-4 flex-wrap')}>
			{#await products}
				{#each [...Array(6)] as _}
					<div class="animate-pulse bg-neutral-700 h-10 w-24 rounded" />
				{/each}
			{:then { data, error }}
				{#if data}
					{#each data as { name } (name)}
						{#if name}
							<Button
								variant="filter"
								class={cn('flex gap-4 flex-wrap', {
									'text-primary': $filter.experiences.includes(name)
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
