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

	$: console.log('profiles', data.profiles);
	// $: ({ profiles, filter } = createProfilesState(data.profiles, data.supabase));

	$: ({ endorse } = $page.data);

	// Sample

	// {
	//     "id": "f86a4c9c-d08e-42d6-8c94-53a11ebc4353",
	//     "display_name": "iklhdio",
	//     "skills": null,
	//     "bio": "iodhw",
	//     "twitter_username": "@charliecoppinger",
	//     "github_username": null,
	//     "website_url": null,
	//     "linkedin_url": null,
	//     "location": "hoidwh",
	//     "timezone": null,
	//     "availibility": null,
	//     "pfp_url": "http://127.0.0.1:54321/storage/v1/render/image/public/profile_pictures/c5ec13dc-f3ce-41bd-9290-fe70cf909f70.png?width=400&height=400&resize=cover",
	//     "created_at": "2024-04-22T07:17:00.63362+00:00",
	//     "updated_at": "2024-04-22T07:33:55.240686+00:00",
	//     "deleted_at": null,
	//     "profile_availability_types": [
	//         {
	//             "id": "48ffc02b-56a9-4fbd-811a-eee40b9a5c4a",
	//             "profile_id": "f86a4c9c-d08e-42d6-8c94-53a11ebc4353",
	//             "availability_types": {
	//                 "id": "19951885-4621-4b10-8a56-5330f3e9deab",
	//                 "name": "MVP"
	//             },
	//             "availability_type_id": "19951885-4621-4b10-8a56-5330f3e9deab"
	//         }
	//     ],
	//     "profiles_roles": [
	//         {
	//             "id": "12c833e3-e2d7-48c4-a0cc-473cfbbd6d2c",
	//             "roles": {
	//                 "id": "8022be82-eaaa-4acf-8183-da1d7519c498",
	//                 "name": "Design"
	//             },
	//             "role_id": "8022be82-eaaa-4acf-8183-da1d7519c498",
	//             "profile_id": "f86a4c9c-d08e-42d6-8c94-53a11ebc4353"
	//         }
	//     ],
	//     "projects": [
	//         {
	//             "id": "89e68e6a-8a7c-44f0-9dca-96079d933ab2",
	//             "created_at": "2024-04-22T07:25:13.095944+00:00",
	//             "deleted_at": null,
	//             "profile_id": "f86a4c9c-d08e-42d6-8c94-53a11ebc4353",
	//             "updated_at": null,
	//             "description": "This is the hottest hackathon proj.",
	//             "project_url": "supabased.com",
	//             "project_name": "Supabased",
	//             "repository_url": "github.com/coppinger/supabased",
	//             "projects_stacks": [
	//                 {
	//                     "stack_id": "916a89ad-2bba-4baa-9e90-401ac7d375aa"
	//                 },
	//                 {
	//                     "stack_id": "baa83017-a50d-4ae5-8768-eb2ae3994b9e"
	//                 }
	//             ]
	//         }
	//     ]
	// }

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
</script>

<SupabaseProductsBar {supabase} />

<header class="border-b border-neutral-800">
	<div
		class="px-4 py-10 md:py-32 md:px-20 flex flex-col md:flex-row justify-center items-center gap-4 relative overflow-hidden max-w-screen-xl mx-auto"
	>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col items-center md:items-start gap-2">
				<h1 class="text-2xl font-bold text-center md:text-left">
					Discover & connect with folks who are building with
				</h1>
				<SupabaseLogo />
			</div>
			<p class="font-medium text-neutral-500 text-center md:text-left">
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
			<div class="h-full flex items-center">
				<p class="text-sm font-medium text-neutral-600">Filters:</p>
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
			{:else}
				<p class="text-sm font-medium text-neutral-600">No filters active</p>
			{/if}
		</div>
		{#await supabaseProfiles}
			{#each [...Array(10)] as _}
				<div class="animate-pulse bg-neutral-700 h-10 w-20 rounded" />
			{/each}
		{:then data}
			{#if data}
				{console.log(data)}
				{#each data.data as profile}
					<div class="flex flex-col gap-6 rounded-md border border-neutral-800 p-6 w-full">
						<div class="flex flex-col gap-6">
							<div class="flex gap-4 items-center w-full">
								<Avatar class="h-12 w-12">
									<AvatarImage src={profile.profile_pic} alt={profile.firstName} />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div>
									<h5>{profile.firstName} {profile.lastName}</h5>
									<p class="text-neutral-600">
										{capitalize(profile.devType.replaceAll('_', ' '))} Developer
									</p>
								</div>
							</div>
							<ul class="flex gap-6 text-neutral-200">
								<li class="">
									<a href="">
										<iconify-icon icon="ic:baseline-discord"></iconify-icon>
									</a>
								</li>
								<li class="">
									<a href="">
										<iconify-icon icon="mdi:github"></iconify-icon>
									</a>
								</li>
								<li class="">
									<a href="">
										<iconify-icon icon="mdi:linkedin"></iconify-icon>
									</a>
								</li>
								<li class="">
									<a href="">
										<iconify-icon icon="mdi:globe"></iconify-icon>
									</a>
								</li>
							</ul>
							<div class="flex gap-2 items-center text-neutral-600">
								<p>UTC-08:00</p>
								<p>•</p>
								<p>Australia</p>
							</div>
						</div>
						<p class="text-neutral-200">{profile.description}</p>
						<div class="flex flex-wrap gap-6 py-4 px-6 border border-neutral-800 rounded-md">
							{#each allAvailabilities as availability}
								<div class="flex gap-2 items-center">
									{#if profile.availabilities.includes(availability)}
										{availability}
										<span class="material-symbols-outlined text-[16px] text-emerald-400">check</span
										>
									{:else}
										{availability}
										<span class="material-symbols-outlined text-[16px] text-neutral-600">close</span
										>
									{/if}
								</div>
							{/each}
						</div>

						<ul class="flex flex-wrap gap-4">
							{#each profile.projects[0].usedTech as usedTech}
								<li
									class="flex items-center justify-center text-neutral-600 text-sm px-4 py-2 rounded-full border border-neutral-800"
								>
									{usedTech}
								</li>
							{/each}
						</ul>
						<div class="flex flex-col gap-6">
							<p class="text-neutral-200">
								{profile.firstName} has built {profile.projects.length} project{profile.projects
									.length
									? 's'
									: ''} with Supabase using:
							</p>
							<div class="flex gap-6 items-center">
								{#each supabaseProducts as { label, Icon }}
									<div class="flex gap-4 items-center text-emerald-400 font-bold">
										<Icon class="h-4 w-4" />
									</div>
								{/each}
							</div>
							<Button variant="outline" class="w-full md:w-fit md:place-self-end"
								>View projects -></Button
							>
						</div>
						<Separator />
						<div class="flex flex-col gap-6">
							<div class="flex flex-col gap-6">
								<Button variant="outline" class="flex gap-2 items-center"
									>Contact <span class="material-symbols-outlined text-[20px] gap-4 items-center"
										>mail</span
									></Button
								>
								<div class="flex flex-col gap-6 items-center w-full">
									<Endorse form={endorse} {profile}>
										<Button variant="outline" class="w-full">Endorse 🫡</Button>
									</Endorse>
									<Button variant="ghost" class="gap-2">
										<span class="flex gap-1">
											<span class="text-opacity-40">
												{profile.endorsement_num}
											</span>
											<span>🫡</span>
										</span>
										<span class="flex -space-x-2">
											<Avatar class="h-8 w-8 border-2 border-background">
												<AvatarImage
													src="https://i.kym-cdn.com/photos/images/original/002/307/265/9a6"
												/>
											</Avatar>
											<Avatar class="h-8 w-8 border-2 border-background">
												<AvatarImage src="https://i.redd.it/l0m6jy5zqwxa1.png" />
											</Avatar>
											<Avatar class="h-8 w-8 border-2 border-background">
												<AvatarImage
													src="https://media.tenor.com/Mfk5cU9Jdg8AAAAe/chad-face-chad.png"
												/>
											</Avatar>
										</span>
										<span>
											<DotsThree class="w-5 h-5 opacity-30" />
										</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		{/await}
	</div>
</div>
