<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="border-b h-16 px-10 w-full">
	<div class=" flex items-center justify-between h-full">
		<a href="/">SUPABASE<span class="text-green-400">D</span></a>

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
		{/if}
	</div>
</div>
