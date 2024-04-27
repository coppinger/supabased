<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import SupabaseLogo from '$lib/components/SupabaseLogo.svelte';
	import SupabaseProductsBar from '$lib/components/layouts/SupabaseProductsBar.svelte';
	import Supa3D from '$lib/components/Supa3D.svelte';
	import * as Profile from '$lib/components/profile';
	import { createProfilesState } from '$lib/stores/profiles.js';
	import Filter from '$lib/components/filter/filter.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let data;

	let { supabase, availabilities, products, profiles: init, stacks, user } = data;
	$: ({ supabase, availabilities, products, profiles: init, stacks, user } = data);

	let { profiles, filter, activeFilters, search, clearFilters } = createProfilesState(
		init,
		supabase
	);
</script>

<SupabaseProductsBar {supabase} {filter} />

<header class="border-b border-neutral-800">
	<div
		class="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-4 overflow-hidden px-4 py-10 md:flex-row md:px-20 md:py-32"
	>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col items-center gap-2 md:items-start">
				<h1 class="text-center text-2xl font-bold text-neutral-50 md:text-left">
					Discover & connect with folks who are building with
				</h1>
				<SupabaseLogo />
			</div>
			<p class=" text-center md:text-left">
				Supabased is a community created & run directory of folks who build with Supabase
			</p>
			{#if user}
				<Button
					variant="outline"
					class="border-emerald-400 text-emerald-400 md:w-fit"
					href="/onboarding/project">Add a project -&gt;</Button
				>
			{:else}
				<Button
					variant="outline"
					class="border-emerald-400 text-emerald-400 md:w-fit"
					href="/auth/signin">Submit your profile -&gt;</Button
				>
			{/if}
		</div>
		<div class="relative h-20 w-full md:flex md:h-40 md:items-center md:justify-center">
			<div
				class="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 md:top-1/2 md:h-[960px] md:w-[960px] md:-translate-y-1/2"
			>
				<Supa3D speed={8} />
			</div>
		</div>
	</div>
</header>

<div
	id="profiles"
	class="mx-auto flex max-w-screen-xl flex-col gap-10 md:flex-row md:p-10 md:px-20"
>
	<div class="hidden flex-col gap-6 md:flex">
		<Filter {filter} availabilityTypes={availabilities} {stacks} {products} />

		<Button variant="outline" class="border-emerald-400 text-emerald-400">
			Submit your profile -&gt;
		</Button>
	</div>
	<div class="flex w-full flex-col gap-6 p-4 md:p-0">
		<div class="flex w-full flex-col gap-4">
			<Input placeholder="Search profiles..." on:input={(e) => ($search = e.currentTarget.value)} />
			<Button variant="outline" class="flex md:hidden">
				Filter profiles
				<span class="material-symbols-outlined text-[20px]">filter_alt</span>
			</Button>
		</div>
		<div class="flex min-h-10 w-full flex-wrap items-center gap-4">
			<div class="flex items-center">
				<p class="text-sm">Filters:</p>
			</div>
			{#if $activeFilters.length}
				{#each $activeFilters as active}
					<Button
						class="flex items-center gap-2 text-emerald-400"
						variant="outline"
						on:click={() => clearFilters(active)}
					>
						{active}
						<span class="material-symbols-outlined text-[12px] leading-none">close</span>
					</Button>
				{/each}
				<Button
					class="flex w-full items-center gap-2 text-emerald-400"
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
			{#each $profiles as profile (profile.id)}
				<Profile.Root {profile}>
					<Profile.Header />
					{#await availabilities then { data }}
						{#if data}
							<Profile.Availability availabilities={data} />
						{/if}
					{/await}
					<!-- <Profile.Products /> -->
					<!-- <Separator /> -->
					<Profile.Social class="place-self-center md:hidden" />
					<Profile.Footer />
				</Profile.Root>
			{/each}
		{/if}
	</div>
</div>
