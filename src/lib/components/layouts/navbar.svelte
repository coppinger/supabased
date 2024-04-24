<script lang="ts">
	import Menu from '$lib/components/menu/Menu.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import type { PageData } from '../../../routes/$types';
	import { invalidateAll } from '$app/navigation';

	$: ({ supabase, user } = $page.data as PageData);

	$: console.log(user);

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) console.log(error);
		await invalidateAll();
	}

	let profile: Tables<'profiles'> | undefined;

	async function loadProfile() {
		const result = await user?.profile;
		profile = result && result.data ? result.data : undefined;
	}
	$: if (user?.profile) loadProfile();
</script>

<div class="border-b w-full">
	<div class=" flex items-center justify-between h-full max-w-screen-xl mx-auto py-6 px-4 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		{#if !user?.id}
			<div class="flex gap-6 items-center">
				<Button href="/login" variant="outline">Sign In</Button>
				<Menu />
			</div>
		{:else}
			<div class="flex gap-6 items-center">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar class="">
							{#if profile}
								<AvatarImage
									src={profile.pfp_url ?? user.user_metadata?.avatar_url}
									alt={profile.display_name}
								/>
								<AvatarFallback>{profile.display_name}</AvatarFallback>
							{:else}
								<Skeleton class="size-10" />
							{/if}
						</Avatar>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#if profile?.username}
								<DropdownMenu.Item href="/profile/{profile.username}">Profile</DropdownMenu.Item>
							{/if}

							<DropdownMenu.Item href="/settings">Settings</DropdownMenu.Item>
							<DropdownMenu.Item on:click={signOut}>Sign Out</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<Menu />
			</div>
		{/if}
	</div>
</div>
