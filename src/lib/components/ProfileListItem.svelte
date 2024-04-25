<script context="module" lang="ts">
	let realtime: ReturnType<SupabaseClient['channel']> | undefined;
	let components = writable(new Map<ReturnType<typeof crypto.randomUUID>, ProfilesResult>());
</script>

<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { DotsThree } from 'phosphor-svelte';
	import { allAvailabilities } from '$lib/components/profile/data';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { EndorsementsResult, ProfilesResult } from '$lib/db/query';
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import type { SupabaseClient, User } from '@supabase/supabase-js';
	import { writable } from 'svelte/store';
	import { cn } from '$lib/utils';
	import type { PageData } from '../../routes/$types';
	import { padStart } from 'lodash-es';

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

	export let profile: ProfilesResult;
	$: ({ endorse, supabase, user } = $page.data as PageData);

	const id = crypto.randomUUID();
	$: if ($components.has(id)) profile = $components.get(id)!;

	onMount(() => {
		$components.set(id, profile);
		$components = $components;

		if (!realtime)
			realtime = supabase
				.channel('endorsements')
				.on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'endorsements'
					},
					async (payload) => {
						const { endorsement_to, endorsed_by } = payload.new;
						for (const [_, profile] of $components) {
							if (endorsement_to === profile.id) {
								const { data, error } = await supabase
									.from('profiles')
									.select()
									.eq('id', endorsed_by)
									.returns<Tables<'profiles'>>();

								if (!error) {
									profile.endorsements.push({
										...payload.new,
										profiles: data
									} as EndorsementsResult);
									$components = $components;
								}
							}
						}
					}
				)
				.on(
					'postgres_changes',
					{
						event: 'DELETE',
						schema: 'public',
						table: 'endorsements'
					},
					(payload) => {
						const { id } = payload.old;
						for (const [_, profile] of $components) {
							const idx = profile.endorsements.findIndex((ele) => ele.id === id);

							if (idx !== -1) {
								profile.endorsements.splice(idx, 1);
								$components = $components;
							}
						}
					}
				)
				.subscribe();

		// clean up
		return () => {
			$components.delete(id);
			$components = $components;
			if ($components.size === 0) {
				realtime?.unsubscribe();
				realtime = undefined;
			}
		};
	});
</script>

<div class="flex flex-col gap-6 rounded-md border border-neutral-800 p-6 w-full">
	<div class="flex flex-col gap-6">
		<div class="flex gap-6 items-center justify-between w-full md:hidden">
			{#each supabaseProducts as { Icon, label }}
				<div
					class={cn('flex gap-4 items-center text-neutral-400 font-bold', {
						'text-emerald-400': $components
							.get(id)
							?.projects.some((ele) => ele.products.some((ele) => ele.product.name === label))
					})}
				>
					<Icon class="h-5 w-5" />
				</div>
			{/each}
		</div>
		<div class="flex justify-between w-full items-center">
			<div class="flex gap-4 items-center w-full">
				<Avatar class="h-16 w-16">
					<AvatarImage src={profile.pfp_url} alt={profile.display_name} />
					<AvatarFallback class="rounded-sm text-center text-xs"
						>{profile.display_name}</AvatarFallback
					>
				</Avatar>
				<div>
					<h5 class="text-neutral-50">{profile.display_name}</h5>
					<p class="text-neutral-600">
						{profile.location}
						{profile.timezone ? ` • ${profile.timezone}` : ''}
					</p>
				</div>
			</div>
			<div class="flex flex-col items-end justify-center gap-4">
				<div class="hidden md:flex gap-6 w-full">
					{#each supabaseProducts as { Icon, label }}
						<div
							class={cn('flex gap-6 items-center text-neutral-400 font-bold', {
								'text-emerald-400': $components
									.get(id)
									?.projects.some((ele) => ele.products.some((ele) => ele.product.name === label))
							})}
						>
							<Icon class="h-4 w-4" />
						</div>
					{/each}
				</div>
				<!-- Social icons -->
				<ul class="hidden md:flex items-center gap-6 text-neutral-600">
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
				<!-- End social icons -->
			</div>
		</div>
	</div>
	<ul
		class="flex md:justify-between flex-wrap gap-6 py-4 px-6 border border-neutral-800 rounded-md"
	>
		{#each allAvailabilities as availability}
			<li class="flex gap-2 items-center text-neutral-200 text-sm">
				{availability}
				{#if $components
					.get(id)
					?.availabilities.find((ele) => ele.availability.name === availability)}
					<span class="material-symbols-outlined text-[16px] text-emerald-400">check</span>
				{:else}
					<span class="material-symbols-outlined text-[16px] text-neutral-600">close</span>
				{/if}
			</li>
		{/each}
	</ul>

	<ul class="flex flex-wrap gap-4">
		{#if profile}
			{@const products = [
				...new Set(
					profile.projects.flatMap((project) =>
						project.products.flatMap((product) => product.product.name)
					)
				)
			]}
			{#each products as product (product)}
				<li
					class="flex items-center justify-center text-neutral-600 text-sm px-4 py-2 rounded-full border border-neutral-800"
				>
					{product}
				</li>
			{/each}
		{/if}
	</ul>

	<Separator />
	<!-- Social icons -->
	<ul class="flex gap-6 text-neutral-600 text-2xl md:text-xl place-self-center md:hidden">
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
	<!-- End social icons -->
	<div class="flex flex-col gap-6 md:flex-row md:justify-between">
		<Button variant="outline" class="flex gap-2 items-center">
			Contact
			<span class="material-symbols-outlined text-[20px] gap-4 items-center"> mail </span>
		</Button>
		<div class="flex flex-col gap-2 items-center w-full md:flex-row">
			<Endorse {profile}>
				<Button variant="outline" class="w-full md:w-fit">Endorse 🫡</Button>
			</Endorse>
			{#if profile}
				<Button
					variant="ghost"
					class="gap-2 justify-center md:justify-start w-full grow md:w-[17.25rem]"
				>
					<span class="flex gap-1 min-w-32">
						<p>Endorsed by</p>
						<span>🫡</span>
						<span class="whitespace-pre">
							{profile.endorsements.length.toString().padStart(4).padEnd(4, ' ')}
						</span>
					</span>
					<span class="flex -space-x-2">
						{#each profile.endorsements as endorsement, _ (endorsement.id)}
							<Avatar class="h-8 w-8 border-2 border-background">
								<AvatarImage src={profile.pfp_url} />
							</Avatar>
						{/each}
					</span>
					{#if profile.endorsements.length > 3}
						<span>
							<DotsThree class="w-5 h-5 opacity-30" />
						</span>
					{/if}
				</Button>
				{#if profile.projects.length > 0}
					<Button variant="outline" class="w-full md:w-fit text-emerald-400 border-emer">
						View {profile.projects.length} project{profile.projects.length > 1 ? 's' : ''} ->
					</Button>
				{:else}
					<div class="w-full"></div>
				{/if}
			{/if}
		</div>
	</div>
</div>
