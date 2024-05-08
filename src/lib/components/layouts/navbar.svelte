<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/shadcn/ui/button';
	import Logo from '$lib/components/layouts/Logo.svelte';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import type { PageData } from '../../../routes/$types';
	import { invalidateAll } from '$app/navigation';
	import * as Dialog from '$lib/components/shadcn/ui/dialog';

	let { supabase, user } = $page.data as PageData;
	$: ({ supabase, user } = $page.data as PageData);

	let profile = user?.profile.data;
	$: if (user) profile = user.profile.data;

	const links = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Settings',
			href: '/settings/profile',
		},
		{
			label: 'Twitter',
			href: 'https://twitter.com/supabasedcom',
		},
		{
			label: 'Discord',
			href: 'https://discord.gg/skunkworks',
		},
	];
	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) console.log(error);
		await invalidateAll();
	}
</script>

<nav class="w-full border-b">
	<div class=" mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 py-6 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		<div class="flex place-content-center place-items-center gap-6">
			{#if !user?.id || !profile}
				<Button href="/login" variant="outline">Sign In</Button>
			{:else}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root class="">
							<Avatar.Image
								src={profile.pfp_url ?? user.user_metadata?.avatar_url}
								alt={profile.display_name}
							/>
							<Avatar.Fallback>{profile.display_name}</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>{profile.username ?? 'My Account'}</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#if profile.username}
								<DropdownMenu.Item href="/profile/{profile.username}">Profile</DropdownMenu.Item>
							{/if}

							<DropdownMenu.Item href="/settings/profile">Settings</DropdownMenu.Item>
							<DropdownMenu.Item on:click={signOut}>Sign Out</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
			<Dialog.Root>
				<Dialog.Trigger>
					<span class="material-symbols-outlined flex size-full place-content-center text-[20px]">
						lunch_dining
					</span>
				</Dialog.Trigger>
				<Dialog.Content
					class="flex items-center justify-center border-0 bg-transparent  bg-opacity-80 backdrop-blur-md backdrop-brightness-105"
				>
					<ul class="flex flex-col items-center justify-center px-6 py-12 text-center">
						{#each links as { label, href }}
							<li>
								<a
									class="inline-flex items-center justify-center gap-2 p-5 text-xl"
									{href}
									target={href.slice(0, 1) !== '/' ? '_blank' : '_self'}
									tabindex="0"
									>{label}
									<p class="-rotate-45">{href.slice(0, 1) !== '/' ? ' ->' : ''}</p>
								</a>
							</li>
						{/each}
					</ul>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</nav>
