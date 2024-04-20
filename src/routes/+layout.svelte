<script lang="ts">
	import NavBar from '$lib/components/layouts/navbar.svelte';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container h-svh">
	<NavBar />
	<slot />
</div>
