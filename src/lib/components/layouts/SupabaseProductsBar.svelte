<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { supabaseProductIcons } from './supabaseProductIcons';
	import type { FilterOptions } from '$lib/stores/profiles';
	import type { PageData } from '../../../routes/$types';
	export let supabase: PageData['supabase'];
	export let filter: Writable<FilterOptions>;

	const supabaseProducts = supabase.from('products').select().order('sort');

	const handleClick = (supabaseProductName: string) => () => {
		filter.update((val) => {
			// Overwrite the experiences filter to just the selected product
			val.experiences = [supabaseProductName];
			return val;
		});
	};
</script>

<div class="border-b border-neutral-800">
	<div
		class="max-w-screen-xl mx-auto p-4 md:py-6 md:px-20 flex items-center justify-between flex-wrap gap-4"
	>
		{#await supabaseProducts}
			{#each [...Array(6)] as _}
				<div class="animate-pulse bg-neutral-700 h-6 w-24 rounded" />
			{/each}
		{:then { data }}
			{#if data}
				{#each data as { name }}
					{#if name}
						<a
							class="px-1 flex gap-4 items-center text-emerald-400 font-bold"
							href="#profiles"
							on:click={handleClick(name)}
						>
							{name}
							{#if supabaseProductIcons[name]}
								<svelte:component this={supabaseProductIcons[name]} class="h-4 w-4" />
							{/if}
						</a>
					{/if}
				{/each}
			{/if}
		{:catch error}
			{console.log(error)}
		{/await}
	</div>
</div>
