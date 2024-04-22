<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="border-b w-full">
	<div class=" flex items-center justify-between h-full max-w-screen-xl mx-auto py-6 px-4 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		{#if $page.data.user}
			{@const { user } = $page.data}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger><Menu /></DropdownMenu.Trigger>
				<DropdownMenu.Content side="bottom" align="end">
					<DropdownMenu.Group>
						<DropdownMenu.Label>{user.username}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>Billing</DropdownMenu.Item>
						<DropdownMenu.Item>Team</DropdownMenu.Item>
						<DropdownMenu.Item>Subscription</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<div class="flex gap-6 items-center">
				<Button href="/auth/signin" variant="outline">Sign In</Button>
				<button class="h-8 w-8 flex items-center justify-center"
					><span class="material-symbols-outlined text-[20px]">lunch_dining</span></button
				>
			</div>
		{/if}
	</div>
</div>
