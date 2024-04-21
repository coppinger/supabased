<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-12 place-items-center justify-between">
	<a href="/">NAVBAR</a>

	{#if $page.data.session?.user}
		<!-- TODO AVATAR -->
	{:else}
		<a href="/auth/signin">Login</a>
	{/if}
</div>
