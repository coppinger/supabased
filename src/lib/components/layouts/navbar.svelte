<script lang="ts">
	import Menu from '$lib/components/menu/Menu.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';

	$: ({ session, supabase } = $page.data);

	async function signOut() {
		const { error } = await supabase.auth.signOut();
	}

	export let profileData: Tables<'profiles'> | null = null;
	const { display_name, pfp_url } = profileData ?? {};
</script>

<div class="border-b w-full">
	<div class=" flex items-center justify-between h-full max-w-screen-xl mx-auto py-6 px-4 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		{#if !session?.user}
			<div class="flex gap-6 items-center">
				<Button href="/login" variant="outline">Sign In</Button>
				<Menu />
			</div>
		{:else}
			<div class="flex gap-6 items-center">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						><Avatar class="">
							<AvatarImage src={pfp_url} alt={display_name} />
							<AvatarFallback>{display_name}</AvatarFallback>
						</Avatar></DropdownMenu.Trigger
					>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item href="/profile">Profile</DropdownMenu.Item>
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
