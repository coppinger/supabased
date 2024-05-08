<script lang="ts">
	import NavBar from '$lib/components/layouts/navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
	import '@fontsource-variable/manrope';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import 'iconify-icon';
	import Footer from '$lib/components/layouts/footer.svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="flex min-h-svh flex-col">
	<Toaster theme={'dark'} closeButton />
	<NavBar />
	<main class="grow">
		<slot />
	</main>
	<Footer />
</div>
