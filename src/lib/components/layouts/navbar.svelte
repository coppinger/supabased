<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="border-b py-6 px-4 w-full">
	<div class=" flex items-center justify-between h-full">
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
			<Button href="/auth/signin">Sign In</Button>
			<button class="h-8 w-8 flex items-center justify-center"
				><span class="material-symbols-outlined text-[20px]">lunch_dining</span></button
			>
		{/if}
	</div>
</div>
