<script lang="ts">
	import NavBar from '$lib/components/layouts/navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
	import '@fontsource-variable/manrope';

	import 'iconify-icon';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
</script>

<Toaster />
<main>
	<NavBar />
	<slot />
</main>

<Footer />
