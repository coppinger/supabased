<script lang="ts">
	import Supa3D from '$lib/components/Supa3D.svelte';
	import Profile from '$lib/components/profile/profile.svelte';
	import Filter from '$lib/filter/filter.svelte';
	import { createProfilesState } from '$lib/stores/profiles.js';
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	export let data;

	$: ({ profiles, filter } = createProfilesState(data.profiles, data.supabase));

	const tags = [
		{
			label: 'Database',
			Icon: Database
		},
		{
			label: 'Auth',
			Icon: Lock
		},
		{
			label: 'Storage',
			Icon: Cloud
		},
		{
			label: 'Edge',
			Icon: Triangle
		},
		{
			label: 'Realtime',
			Icon: MousePointerClick
		},
		{
			label: 'Vector',
			Icon: Box
		}
	];
</script>

<div class="">
	<div class="p-2 w-full">
		<div class="flex items-center justify-between border-b pt-2 pb-4 mx-auto">
			{#each tags as { label, Icon }}
				<div class="flex select-none rounded-full text-primary justify-between px-4">
					{label}
					<Icon class="ml-2" />
				</div>
			{/each}
		</div>
		<div class="flex py-10 p-2">
			<div class="w-1/3 space-y-3">
				<h1 class="text-4xl">A community of folks building with Supabase.</h1>
				<h3 class="text-lg text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</h3>
			</div>
			<!--FIXME scale correctly-->
			<div class="ml-auto">
				<Supa3D speed={8} />
			</div>
		</div>
		<div class="container px-2 mx-auto w-full flex gap-4">
			<Filter {filter} />
			<!-- TODO added ml-auto class for now, remove when we add filter/search if not needed-->
			<div class="w-2/3 ml-auto space-y-4">
				{#each $profiles as profile}
					<Profile {profile} />
				{/each}
			</div>
		</div>
	</div>
</div>
