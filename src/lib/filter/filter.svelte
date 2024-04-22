<script lang="ts">
	import Combox from '$lib/components/combobox/combox.svelte';
	import { allAvailabilities } from '$lib/components/profile/data';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import type { CreateProfilesState } from '$lib/stores/profiles';
	import { cn } from '$lib/utils';
	import { ArrowRight, Info } from 'lucide-svelte';

	export let filter: ReturnType<CreateProfilesState>['filter'];

	const stacks = ['React', 'NextJS', 'ShadCN', 'Typescript', 'Javascript', 'Svelte'] as const;
	const experiences = ['All', 'Database', 'Auth', 'Storage', 'Edge', 'Realtime', 'Vector'] as const;

	function handleFilter<T extends keyof typeof $filter>(
		key: T,
		filter: NonNullable<(typeof $filter)[T]>[number]
	) {
		if (key === 'experiences' && filter === 'All') {
			$filter[key] = ['All'];
			return;
		}
		if ($filter[key].includes(filter)) {
			const idx = $filter[key].findIndex((str) => str === filter);
			if (idx !== -1) $filter[key].splice(idx, 1);
		} else {
			$filter[key].push(filter);
		}
		$filter = $filter;
		return;
	}

	const stacksComoboxData = stacks.map((stack) => ({ value: stack, label: stack }));
</script>

<div class="col-span-1 space-y-4">
	<div class="border rounded-xl p-8 space-y-8">
		<div class="flex gap-2 items-center">
			<div class="text-2xl">Stacks</div>
			<Button variant="ghost" size="icon" class="p-0.5 h-auto w-auto">
				<Info class="w-4 h-4" />
			</Button>
		</div>
		<Combox
			selected={$filter['stacks']}
			data={stacksComoboxData}
			placeholder="Search Stacks..."
			multiple
			inputClassName="w-full"
		/>
		<div class="text-lg">Popular Stacks</div>
		<div class="flex flex-wrap gap-1">
			{#each stacks as stack}
				<Button
					variant="outline"
					class="rounded-[8px] flex items-center justify-between gap-4"
					on:click={() => handleFilter('stacks', stack)}
				>
					<span>{stack}</span>
					<Checkbox
						checked={$filter['stacks'].includes(stack)}
						class={cn('w-4 h-4 rounded-[6px] outline-muted-foreground border-input')}
					/>
				</Button>
			{/each}
		</div>

		<div class="flex gap-2 items-center">
			<div class="text-lg">Availability</div>
			<Button variant="ghost" size="icon" class="p-0.5 h-auto w-auto">
				<Info class="w-4 h-4" />
			</Button>
		</div>

		<div class="flex flex-wrap gap-1">
			{#each allAvailabilities as availability}
				<Button
					variant="outline"
					on:click={() => handleFilter('availibility', availability)}
					class={cn(
						'rounded-[8px]',
						$filter['availibility'].includes(availability) && 'text-primary hover:text-primary'
					)}>{availability}</Button
				>
			{/each}
		</div>

		<div class="text-lg">Supabase Experience</div>
		<div class="flex flex-wrap gap-1">
			{#each experiences as experience}
				<Button
					variant="outline"
					on:click={() => handleFilter('experiences', experience)}
					class={cn(
						'rounded-[8px]',
						$filter['experiences'].includes(experience) && 'text-primary hover:text-primary'
					)}>{experience}</Button
				>
			{/each}
		</div>
	</div>
	<Button class="w-full text-primary" variant="outline">
		Submit Your Profile <ArrowRight class="h-5 w-5 ml-2" />
	</Button>
	<div class="flex gap-2 items-center">
		<Button class="w-full" variant="outline">Discord</Button>
		<Button class="w-full" variant="outline">@supabsedcom</Button>
	</div>
</div>
