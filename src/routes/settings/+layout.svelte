<script lang="ts">
	export let data;

	const settingPaths = [
		{
			label: 'Profile',
			href: '/settings/profile'
		}
		//... add more paths
	];
</script>

<div class="flex gap-2">
	<section class="flex flex-col gap-2">
		{#each settingPaths as path}
			<a href={path.href}>{path.label}</a>
		{/each}
	</section>
	<slot />
</div>
