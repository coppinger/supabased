<script lang="ts">
	// ShadCN
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	// Components
	import SupabaseLogo from '$lib/components/SupabaseLogo.svelte';
	import SupabaseProductsBar from '$lib/components/layouts/SupabaseProductsBar.svelte';
	// ThreeJS
	import Supa3D from '$lib/components/Supa3D.svelte';

	// Filter chip data
	// TODO: Create a DB View to get the most popular stacks by grouping/counting on the projects table - https://stackoverflow.com/questions/71905843/how-can-i-do-select-count-with-group-by-in-supabase-js

	// Send to profiles component
	import ProfileListItem from '$lib/components/ProfileListItem.svelte';
	import { createProfilesState } from '$lib/stores/profiles.js';
	import Filter from '$lib/components/filter/filter.svelte';

	export let data;
	$: ({ supabase, availabilityTypes, products, profiles: init, stacks } = data);
	$: ({ profiles, filter, activeFilters, clearFilters } = createProfilesState(init, supabase));
</script>

<SupabaseProductsBar {supabase} />

<header class="border-b border-neutral-800">
	<div
		class="px-4 py-10 md:py-32 md:px-20 flex flex-col md:flex-row justify-center items-center gap-4 relative overflow-hidden max-w-screen-xl mx-auto"
	>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col items-center md:items-start gap-2">
				<h1 class="text-2xl font-bold text-center md:text-left text-neutral-50">
					Discover & connect with folks who are building with
				</h1>
				<SupabaseLogo />
			</div>
			<p class=" text-center md:text-left">
				Supabased is a community created & run directory of folks who build with Supabase
			</p>
			<Button
				variant="outline"
				class="text-emerald-400 border-emerald-400 md:w-fit"
				href="/auth/signin">Submit your profile -></Button
			>
			<div class="flex gap-6 items-center">
				<Button
					variant="outline"
					href="https://discord.gg/skunkworks"
					target="_blank"
					class="flex gap-2 items-center"
					>Discord <iconify-icon icon="ic:baseline-discord"></iconify-icon></Button
				>
				<Button
					variant="outline"
					href="https://twitter.com/supabasedcom"
					target="_blank"
					class="flex gap-2 items-center"
					>Twitter <iconify-icon icon="mdi:twitter"></iconify-icon></Button
				>
			</div>
		</div>
		<!-- TODO: Remove this pointer-events-none and use z-index instead -->
		<div
			class="w-full h-20 md:h-40 relative pointer-events-none md:flex md:items-center md:justify-center"
		>
			<div
				class="absolute -top-32 w-[500px] h-[500px] md:w-[960px] md:h-[960px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2"
			>
				<Supa3D speed={8} />
			</div>
		</div>
	</div>
</header>

<div class="flex flex-col md:flex-row gap-10 max-w-screen-xl mx-auto md:p-10 md:px-20">
	<div class="hidden md:flex flex-col gap-6">
		<Filter {filter} {availabilityTypes} {stacks} {products} />

		<Button variant="outline" class="text-emerald-400 border-emerald-400">
			Submit your profile ->
		</Button>
		<div class="flex gap-6 items-center">
			<Button
				variant="outline"
				href="https://discord.gg/skunkworks"
				target="_blank"
				class="flex gap-2 items-center w-full"
				>Discord <iconify-icon icon="ic:baseline-discord"></iconify-icon></Button
			>
			<Button
				variant="outline"
				href="https://twitter.com/supabasedcom"
				target="_blank"
				class="flex gap-2 items-center w-full"
				>Twitter <iconify-icon icon="mdi:twitter"></iconify-icon></Button
			>
		</div>
	</div>
	<div class="flex flex-col gap-6 p-4 md:p-0 w-full">
		<div class="flex flex-col gap-4 w-full">
			<Input placeholder="Search profiles..." />
			<Button variant="outline">
				Filter profiles
				<button class="h-8 w-8 flex items-center justify-center">
					<span class="material-symbols-outlined text-[20px]">filter_alt</span>
				</button>
			</Button>
		</div>
		<div class="flex flex-wrap gap-4 items-center w-full min-h-10">
			<div class="flex items-center">
				<p class="text-sm">Filters:</p>
			</div>
			{#if $activeFilters.length}
				{#each $activeFilters as active}
					<Button
						class="text-emerald-400 flex items-center gap-2"
						variant="outline"
						on:click={() => clearFilters(active)}
					>
						{active}
						<span class="material-symbols-outlined text-[12px] leading-none">close</span>
					</Button>
				{/each}
				<!-- TODO: This button should clear all existing applied filters -->
				<Button
					class="text-emerald-400 flex items-center gap-2 w-full"
					variant="secondary"
					on:click={() => clearFilters()}
				>
					Clear all filters
					<span class="material-symbols-outlined text-[20px] leading-none">filter_alt_off</span>
				</Button>
			{:else}
				<p class="text-sm">No filters active</p>
			{/if}
		</div>
		{#if $profiles}
			{console.log($profiles)}
			{#each $profiles as profile}
				<ProfileListItem {profile} />
			{/each}
		{/if}
	</div>
</div>
