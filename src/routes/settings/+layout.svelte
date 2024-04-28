<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let data;

	const settingPaths = [
		{
			label: 'Profile',
			href: '/settings/profile',
		},
		{
			label: 'Projects',
			href: '/settings/projects',
		},
		// {
		// 	label: 'Profile',
		// 	href: '/settings/social'
		// },
		//... add more paths
	];
</script>

<div class="flex grow gap-2">
	<section class="flex min-w-64 flex-col gap-2">
		{#each settingPaths as path}
			<Button href={path.href}>{path.label}</Button>
		{/each}
	</section>
	<section class="p-2">
		<slot />
	</section>
</div>
