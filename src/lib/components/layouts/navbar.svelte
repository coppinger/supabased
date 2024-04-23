<script lang="ts">
	import Menu from '$lib/components/menu/Menu.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';

	$: ({ user } = $page.data);
</script>

<div class="border-b w-full">
	<div class=" flex items-center justify-between h-full max-w-screen-xl mx-auto py-6 px-4 md:px-20">
		<a href="/" class="max-h-8">
			<Logo />
		</a>

		{#if $page.data.user}
			{@const { user } = $page.data}
			<div class="flex gap-6 items-center">
				<Button href="/login" variant="outline">Sign In</Button>
				<Menu />
			</div>
		{:else}
			<div class="flex gap-6 items-center">
				<Button href="/login" variant="outline">Sign In</Button>
				<Menu />
			</div>
		{/if}
	</div>
</div>
