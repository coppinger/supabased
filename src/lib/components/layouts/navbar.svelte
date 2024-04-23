<script lang="ts">
	import Menu from '$lib/components/menu/Menu.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';

	$: ({ session, supabase } = $page.data);
	async function signOut() {
		const { error } = await supabase.auth.signOut();
	}
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
				<Button on:click={signOut} variant="outline">Sign Out</Button>
				<Menu />
			</div>
		{/if}
	</div>
</div>
