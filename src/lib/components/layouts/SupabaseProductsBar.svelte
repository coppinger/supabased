<script lang="ts">
	import { supabaseProductIcons } from './supabaseProductIcons';
	export let supabase;

	const supabaseProducts = supabase.from('supabase_products').select().order('sort');
</script>

<div class="border-b border-neutral-800">
	<div
		class="max-w-screen-xl mx-auto p-4 md:py-6 md:px-20 flex items-center justify-between flex-wrap gap-4"
	>
		{#await supabaseProducts}
			{#each [...Array(6)] as _}
				<div class="animate-pulse bg-neutral-700 h-6 w-24 rounded" />
			{/each}
		{:then data}
			{#each data.data as { name }}
				<div class="px-1 flex gap-4 items-center text-emerald-400 font-bold">
					{name}
					{#if supabaseProductIcons[name]}
						<svelte:component this={supabaseProductIcons[name]} class="h-4 w-4" />
					{/if}
				</div>
			{/each}
		{:catch error}
			{console.log(error)}
		{/await}
	</div>
</div>
