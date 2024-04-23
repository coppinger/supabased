<script lang="ts">
	// ShadCN

	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { Checkbox } from '$lib/components/ui/checkbox';

	import * as Tooltip from '$lib/components/ui/tooltip';

	import { Separator } from '$lib/components/ui/separator';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { DotsThree, GithubLogo } from 'phosphor-svelte';
	import { allAvailabilities } from '$lib/components/profile/data';

	// Components

	import SupabaseLogo from '$lib/components/SupabaseLogo.svelte';
	import { supabaseProductIcons } from '$lib/components/layouts/supabaseProductIcons';
	import SupabaseProductsBar from '$lib/components/layouts/SupabaseProductsBar.svelte';
	import { profiles as mockProfiles } from '$lib/components/profile/mock.js';

	// ThreeJS

	import Supa3D from '$lib/components/Supa3D.svelte';

	import { capitalize } from 'lodash-es';
	import { page } from '$app/stores';
	import type { Profile } from '$lib/components/profile/mock';
	import Project from '$lib/components/profile/project/project.svelte';

	export let data;
	const { supabase } = data;

	// Filter chip data
	const supabaseProfiles = supabase.from('profiles').select();
	const supabaseProducts = supabase.from('supabase_products').select().order('sort');
	const availabilityTypes = supabase.from('availability_types').select().order('sort');
	const popularStacks = supabase.from('stacks').select('name').limit(10); // TODO: Create a DB View to get the most popular stacks by grouping/counting on the projects table - https://stackoverflow.com/questions/71905843/how-can-i-do-select-count-with-group-by-in-supabase-js

	// Send to profiles component
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	import { createProfilesState } from '$lib/stores/profiles.js';
	import { onMount } from 'svelte';
	import type { Tables } from '$lib/types/DatabaseDefinitions.js';
	import ProfileListItem from '$lib/components/ProfileListItem.svelte';

	// $: ({ profiles, filter } = createProfilesState(data.profiles, data.supabase));

	$: ({ endorse } = $page.data);

	// const filteredData = supaProfiles.profiles.filter((profile) => {
	// 	if (
	// 		$filter.availibility.length &&
	// 		!profile.profile_availability_types.some((availability) =>
	// 			$filter.availibility.includes(availability.availability_types.name)
	// 		)
	// 	)
	// 		return false;
	// 	return true
	// 	if (
	// 		!profile.projects
	// 			.map((project) =>
	// 				project.usedTech.some((experience) => $filter.experiences.includes(experience))
	// 			)
	// 			.flat()
	// 			.some((bool) => bool)
	// 	)
	// 		return false;
	// 	if (
	// 		$filter.experiences.length &&
	// 		!profile.projects.some((project) =>
	// 			project.usedTech.some((experience) => $filter.experiences.includes(experience))
	// 		)
	// 	)
	// 		return false;
	// 	return true;
	// });

	export let profiles: Tables<'profiles'>;

	const { profilesData } = data;

	$: console.log('profiles: ', profiles);
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

<div class="flex flex-col md:flex-row gap-6 max-w-screen-xl mx-auto md:p-10 md:px-20">
	<div class="hidden md:flex flex-col gap-6">
		<div class="flex flex-col gap-8 border border-neutral-800 p-8 w-[400px] rounded-md">
			<div class="flex flex-col gap-8">
				<div class="flex items-center gap-2">
					<p class="text-xl font-bold">Stacks</p>
					<Tooltip.Root>
						<Tooltip.Trigger
							><p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
								info
							</p></Tooltip.Trigger
						>
						<Tooltip.Content>
							<p>Add to library</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
				<Input placeholder="Search stacks..." />
				<p class="text-neutral-50 font-bold">Popular stacks</p>
				<div class="flex gap-4 flex-wrap">
					{#await popularStacks}
						{#each [...Array(10)] as _}
							<div class="animate-pulse bg-neutral-700 h-10 w-20 rounded" />
						{/each}
					{:then data}
						{#each data?.data as { name }}
							<Button variant="outline" class="flex gap-4"
								>{name}
								<Checkbox /></Button
							>
						{/each}
					{/await}
				</div>
			</div>
			<div class="flex flex-col gap-8">
				<div class="flex items-center gap-2">
					<p class="text-xl font-bold">Availability</p>
					<Tooltip.Root>
						<Tooltip.Trigger
							><p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
								info
							</p></Tooltip.Trigger
						>
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
					{:then data}
						{#each data?.data as { name }}
							<Button variant="outline" class="flex gap-4"
								>{name}
								<Checkbox /></Button
							>
						{/each}
					{/await}
				</div>
			</div>
			<div class="flex flex-col gap-8">
				<div class="flex items-center gap-2">
					<p class="text-xl font-bold">Supabase Experience</p>
					<Tooltip.Root>
						<Tooltip.Trigger
							><p class="material-symbols-outlined text-neutral-600 text-[16px] leading-none h-4">
								info
							</p></Tooltip.Trigger
						>
						<Tooltip.Content>
							<p>Add to library</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>

				<div class="flex gap-4 flex-wrap">
					{#await supabaseProducts}
						{#each [...Array(6)] as _}
							<div class="animate-pulse bg-neutral-700 h-10 w-24 rounded" />
						{/each}
					{:then data}
						{#each data?.data as { name }}
							<Button variant="outline" class="flex gap-4"
								>{name}
								<svelte:component this={supabaseProductIcons?.[name]} class="h-4 w-4" /></Button
							>
						{/each}
					{/await}
				</div>
			</div>
		</div>
		<Button variant="outline" class="text-emerald-400 border-emerald-400"
			>Submit your profile -></Button
		>
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
	<div class="flex flex-col gap-6 p-4 w-full">
		<div class="flex flex-col gap-4 w-full">
			<Input placeholder="Search profiles..." />
			<Button variant="outline"
				>Filter profiles <button class="h-8 w-8 flex items-center justify-center"
					><span class="material-symbols-outlined text-[20px]">filter_alt</span></button
				></Button
			>
		</div>
		<div class="flex flex-wrap gap-4 items-center w-full min-h-10">
			<div class="flex items-center">
				<p class="text-sm">Filters:</p>
			</div>
			<!-- TODO: If filters are active, render this and loop through the active filters in the button below -->
			{#if true}
				<!-- TODO: These buttons should remove the relevant filter from the list of active filters -->
				<Button class="text-emerald-400 flex items-center gap-2" variant="outline"
					>React
					<span class="material-symbols-outlined text-[12px] leading-none">close</span>
				</Button>
				<!-- TODO: This button should clear all existing applied filters -->
				<Button class="text-emerald-400 flex items-center gap-2 w-full" variant="secondary"
					>Clear all filters <span class="material-symbols-outlined text-[20px] leading-none"
						>filter_alt_off</span
					></Button
				>
				<p>Test</p>
			{:else}
				<p class="text-sm">No filters active</p>
			{/if}
		</div>
		{#if profilesData}
			{#each profilesData as profile}
				<ProfileListItem {profile} />
			{/each}
		{/if}
	</div>
</div>
