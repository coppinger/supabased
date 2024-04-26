<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let data;

	const settingPaths = [
		{
			label: 'Profile',
			href: '/settings/profile'
		},
		{
			label: 'Projects',
			href: '/settings/projects'
		}
		// {
		// 	label: 'Profile',
		// 	href: '/settings/social'
		// },
		//... add more paths
	];
</script>

<div class="flex gap-2 grow">
	<section class="flex flex-col gap-2 min-w-64">
		{#each settingPaths as path}
			<Button href={path.href}>{path.label}</Button>
		{/each}
	</section>
	<slot />
</div>
