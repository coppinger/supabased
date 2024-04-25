<script lang="ts">
	import NavBar from '$lib/components/layouts/navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
	import '@fontsource-variable/manrope';

	import { menuBoolean } from '$lib/menuStore';
	import { fade } from 'svelte/transition';
	import setFocus from '@svackages/set-focus';
	function toggleMenu() {
		menuBoolean.update((value) => !value);
	}

	import 'iconify-icon';
	import Footer from '$lib/components/Footer.svelte';
	import { menuItems } from '$lib/components/menu/menuItems';
	import { dev } from '$app/environment';

	export let data;

	if (dev) console.log(data.session);
</script>

{#if $menuBoolean}
	<nav
		transition:fade
		class="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-neutral-950 bg-opacity-80 backdrop-blur-md"
		aria-label="Main navigation"
		use:setFocus
	>
		<ul class="flex flex-col items-center justify-center px-6 py-12 text-center">
			{#each menuItems as { label, href }}
				<li>
					<a
						class="inline-flex gap-2 items-center justify-center p-5 text-xl"
						on:click={() => {
							toggleMenu();
						}}
						{href}
						target={href.slice(0, 1) !== '/' ? '_blank' : '_self'}
						tabindex="0"
						>{label}
						<p class="-rotate-45">{href.slice(0, 1) !== '/' ? ' ->' : ''}</p>
					</a>
				</li>
			{/each}
			<button
				on:click={() => {
					toggleMenu();
				}}
				aria-label="Close menu"
				aria-expanded={$menuBoolean}
				class="p-5 flex items-center justify-center"
			>
				<span class="material-symbols-outlined"> close </span>
			</button>
		</ul>
	</nav>
{/if}

<Toaster />
<main>
	<NavBar />
	<slot />
</main>

<Footer />
