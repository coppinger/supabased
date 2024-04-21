<script lang="ts">
	import { allAvailabilities } from '$lib/components/profile/data';
	import { Button } from '$lib/components/ui/button';
	import type { CreateProfilesState } from '$lib/stores/profiles';

	export let filter: ReturnType<CreateProfilesState>['filter'];

	const populars = ['React', 'NextJS', 'ShadCN', 'Typescript', 'Javascript', 'Svelte'] as const;
	const experiences = ['All', 'Database', 'Auth', 'Storage', 'Edge', 'Realtime', 'Vector'] as const;

	function handleFilter<T extends keyof typeof $filter>(
		key: T,
		filter: NonNullable<(typeof $filter)[T]>[number]
	) {
		if ($filter[key].includes(filter)) {
			const idx = $filter[key].findIndex((str) => str === filter);
			if (idx !== -1) $filter[key].splice(idx, 1);
		} else {
			$filter[key].push(filter);
		}
		$filter = $filter;
		return;
	}
</script>

<div class="max-w-40">
	Popular Stacks
	<div class="flex flex-wrap">
		{#each populars as popular}
			<Button on:click={() => handleFilter('stacks', popular)}>{popular}</Button>
		{/each}
	</div>

	Availabilities
	<div class="flex flex-wrap">
		{#each allAvailabilities as availability}
			<Button on:click={() => handleFilter('availibility', availability)}>{availability}</Button>
		{/each}
	</div>

	Experiences
	<div class="flex flex-wrap">
		{#each experiences as experience}
			<Button on:click={() => handleFilter('experiences', experience)}>{experience}</Button>
		{/each}
	</div>
</div>
