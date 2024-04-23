<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { goto } from '$app/navigation';

	$: ({ user } = $page.data);

	async function signOut() {
		const { error } = await $page.data.supabase.auth.signOut();
		await goto($page.url, {
			invalidateAll: true
		});
	}
</script>

<div class="border-b w-full">
	<div class=" flex items-center justify-between h-full max-w-screen-xl mx-auto py-6 px-4 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		{#if user}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#if user.user_metadata.avatar_url}
						{@const src = user.user_metadata.avatar_url}
						<Avatar.Root>
							<Avatar.Image {src} alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					{:else}
						<Menu />
					{/if}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content side="bottom" align="end">
					<DropdownMenu.Group>
						<DropdownMenu.Label>{user.user_metadata.user_name}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={signOut}>Sign Out</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<div class="flex gap-6 items-center">
				<Button href="/login" variant="outline">Sign In</Button>
				<button class="h-8 w-8 flex items-center justify-center">
					<span class="material-symbols-outlined text-[20px]">lunch_dining</span>
				</button>
			</div>
		{/if}
	</div>
</div>
