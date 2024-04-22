<script lang="ts">
	// ShadCN

	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { Separator } from '$lib/components/ui/separator';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { DotsThree, GithubLogo } from 'phosphor-svelte';
	import { allAvailabilities } from '$lib/components/profile/data';

	// Components

	import SupabaseLogo from '$lib/components/SupabaseLogo.svelte';

	import SupabaseProductsBar from '$lib/components/layouts/SupabaseProductsBar.svelte';

	// ThreeJS

	import Supa3D from '$lib/components/Supa3D.svelte';

	import { capitalize } from 'lodash-es';
	import { page } from '$app/stores';
	import type { Profile } from '$lib/components/profile/mock';
	import Project from '$lib/components/profile/project/project.svelte';

	export let data;
	const { profiles } = data;

	// Send to profiles component

	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	const supabaseProducts = [
		{
			label: 'Database',
			Icon: Database
		},
		{
			label: 'Auth',
			Icon: Lock
		},
		{
			label: 'Storage',
			Icon: Cloud
		},
		{
			label: 'Edge',
			Icon: Triangle
		},
		{
			label: 'Realtime',
			Icon: MousePointerClick
		},
		{
			label: 'Vector',
			Icon: Box
		}
	];

	$: ({ endorse } = $page.data);

	export let profile: Profile;
</script>

<SupabaseProductsBar />

<header
	class="px-4 py-10 flex flex-col justify-center items-center gap-4 relative overflow-hidden border-b border-neutral-800"
>
	<div class="flex flex-col items-center gap-2">
		<h1 class="text-2xl font-bold text-center">
			Discover & connect with folks who are building with
		</h1>
		<SupabaseLogo />
	</div>
	<p class="font-medium text-neutral-500 text-center">
		Supabased is a community created & run directory of folks who build with Supabase
	</p>
	<Button variant="outline" class="text-emerald-400 border-emerald-400"
		>Submit your profile -></Button
	>
	<div class="w-full h-20 relative">
		<div class="absolute -top-32 w-[500px] h-[500px] left-1/2 -translate-x-1/2">
			<Supa3D speed={8} />
		</div>
	</div>
</header>

<main class="flex flex-col gap-6">
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
		{#each profiles as profile}
			<!-- Start profile list component -->
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
				<!-- Availabilities -->
				<div class="flex flex-wrap gap-6 py-4 px-6 border border-neutral-800 rounded-md">
					{#each allAvailabilities as availability}
						<div class="flex gap-2 items-center">
							{#if profile.availabilities.includes(availability)}
								{availability}
								<span class="material-symbols-outlined text-[16px] text-emerald-400">check</span>
							{:else}
								{availability}
								<span class="material-symbols-outlined text-[16px] text-neutral-600">close</span>
							{/if}
						</div>
					{/each}
				</div>
				<!-- Stacks -->
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
						{profile.firstName} has built {profile.projects.length} project{profile.projects.length
							? 's'
							: ''} with Supabase using:
					</p>
					<div class="flex gap-6 items-center">
						<!-- TODO: These values should be an aggregate set of all of the users projects -->
						{#each supabaseProducts as { label, Icon }}
							<!-- TODO: If the product has been used, it should be green, otherwise neutral-600 -->
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
							<!-- TODO: Unfuck this fucking button. Pls, our Lord and Saviour, TheMixedNuts, help me 🙏🥹 -->
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
			<!-- End profile list component -->
		{/each}
	</div>
</main>
