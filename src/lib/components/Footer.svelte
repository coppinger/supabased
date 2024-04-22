<script lang="ts">
	import Logo from './Logo.svelte';
	import SupabaseLogo from './SupabaseLogo.svelte';
	import Button from './ui/button/button.svelte';
</script>

<footer class="">
	<div
		class="flex flex-col gap-6 px-4 py-20 border-y border-neutral-800 items-center justify-center"
	>
		<Logo />
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-2xl font-bold text-center">
				Discover & connect with folks who are building with
			</h1>
			<SupabaseLogo />
		</div>
		<Button variant="outline" class="text-emerald-400 border-emerald-400"
			>Submit your profile -></Button
		>
	</div>
</footer>
