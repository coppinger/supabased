<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { capitalize } from 'lodash-es';

	import { Separator } from '$lib/components/ui/separator';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { DotsThree, GithubLogo } from 'phosphor-svelte';
	import { allAvailabilities } from '$lib/components/profile/data';

	import type { Tables } from '$lib/types/DatabaseDefinitions';
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

	export let profile: Tables<'profiles'>;
</script>

<!-- <pre>{JSON.stringify(profile, null, 2)}</pre> -->

<div class="flex flex-col gap-6 rounded-md border border-neutral-800 p-6 w-full">
	<div class="flex flex-col gap-6">
		<!-- TODO: Light up the apporpriate icons based on an aggregate of the users projects products -->
		<div class="flex gap-6 items-center justify-between w-full">
			{#each supabaseProducts as { Icon }}
				<div class="flex gap-4 items-center text-emerald-400 font-bold">
					<Icon class="h-5 w-5" />
				</div>
			{/each}
		</div>
		<div class="flex gap-4 items-center w-full">
			<Avatar class="h-12 w-12">
				<AvatarImage src={profile.pfp_url} alt={profile.display_name} />
				<AvatarFallback>{profile.display_name[0]}</AvatarFallback>
			</Avatar>
			<div>
				<h5>{profile.display_name}</h5>
				<p class="text-neutral-600">
					{profile.location}
					{profile.timezone ? ` • ${profile.timezone}` : ''}
				</p>
			</div>
		</div>
		<ul class="flex gap-6 text-neutral-600 text-xl">
			{#if profile.github_username}
				<li class="hover:text-neutral-50 transition-all ease-linear duration-300">
					<a href={`https://github.com/${profile.github_username}`} target="_blank">
						<iconify-icon icon="mdi:github"></iconify-icon>
					</a>
				</li>
			{/if}

			{#if profile.linkedin_url}
				<li class="hover:text-neutral-50 transition-all ease-linear duration-300">
					<a href={profile.linkedin_url} target="_blank">
						<iconify-icon icon="mdi:linkedin"></iconify-icon>
					</a>
				</li>
			{/if}

			{#if profile.twitter_username}
				<li class="hover:text-neutral-50 transition-all ease-linear duration-300">
					<a href={`https://twitter.com/${profile.twitter_username}`} target="_blank">
						<iconify-icon icon="mdi:twitter"></iconify-icon>
					</a>
				</li>
			{/if}

			{#if profile.website_url}
				<li class="hover:text-neutral-50 transition-all ease-linear duration-300">
					<a href={profile.website_url} target="_blank">
						<iconify-icon icon="mdi:globe"></iconify-icon>
					</a>
				</li>
			{/if}
		</ul>
		<div class="flex gap-2 items-center text-neutral-600">
			<p>UTC-08:00</p>
			<p>•</p>
			<p>Australia</p>
		</div>
	</div>
	<div class="flex flex-wrap gap-6 py-4 px-6 border border-neutral-800 rounded-md">
		<!-- {#each allAvailabilities as availability}
			<div class="flex gap-2 items-center">
				{#if profile.availabilities.includes(availability)}
					{availability}
					<span class="material-symbols-outlined text-[16px] text-emerald-400">check</span>
				{:else}
					{availability}
					<span class="material-symbols-outlined text-[16px] text-neutral-600">close</span>
				{/if}
			</div>
		{/each} -->
	</div>

	<ul class="flex flex-wrap gap-4">
		<!-- {#each profile.projects[0].usedTech as usedTech}
			<li
				class="flex items-center justify-center text-neutral-600 text-sm px-4 py-2 rounded-full border border-neutral-800"
			>
				{usedTech}
			</li>
		{/each} -->
	</ul>
	<div class="flex flex-col gap-6">
		<!-- <p class="text-neutral-200">
			{profile.firstName} has built {profile.projects.length} project{profile.projects.length
				? 's'
				: ''} with Supabase using:
		</p>
		<div class="flex gap-6 items-center">
			{#each supabaseProducts as { label, Icon }}
				<div class="flex gap-4 items-center text-emerald-400 font-bold">
					<Icon class="h-4 w-4" />
				</div>
			{/each}
		</div> -->
		<Button variant="outline" class="w-full md:w-fit md:place-self-end">View projects -></Button>
	</div>
	<Separator />
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-6">
			<Button variant="outline" class="flex gap-2 items-center"
				>Contact <span class="material-symbols-outlined text-[20px] gap-4 items-center">mail</span
				></Button
			>
			<div class="flex flex-col gap-6 items-center w-full">
				<!-- <Endorse form={endorse} {profile}>
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
							<AvatarImage src="https://i.kym-cdn.com/photos/images/original/002/307/265/9a6" />
						</Avatar>
						<Avatar class="h-8 w-8 border-2 border-background">
							<AvatarImage src="https://i.redd.it/l0m6jy5zqwxa1.png" />
						</Avatar>
						<Avatar class="h-8 w-8 border-2 border-background">
							<AvatarImage src="https://media.tenor.com/Mfk5cU9Jdg8AAAAe/chad-face-chad.png" />
						</Avatar>
					</span>
					<span>
						<DotsThree class="w-5 h-5 opacity-30" />
					</span>
				</Button> -->
			</div>
		</div>
	</div>
</div>
