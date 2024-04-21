<script lang="ts">
	import NavBar from '$lib/components/layouts/navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';

	export let data;
</script>

<Toaster />
<main class="container h-svh">
	<NavBar />
	<slot />
</main>
