<script lang="ts">
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

		{#if user}
			<span class="material-symbols-outlined text-[20px]">lunch_dining</span>
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
