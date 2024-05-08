<script lang="ts">
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import { cn } from '$lib/components/shadcn/utils';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Writable } from 'svelte/store';
	import { Button } from '$lib/components/shadcn/ui/button';
	import type { PageData } from '../../../routes/$types';

	type $$Props = HTMLAttributes<HTMLUListElement> & { availabilities: Tables<'availabilities'>[] };
	export let availabilities: $$Props['availabilities'];
	let className: $$Props['class'] = undefined;
	export { className as class };

	const profile = getContext<Writable<NonNullable<PageData['user']['profile']['data']>>>('profile');
	const isEditing = getContext<Writable<boolean>>('isEditing');

	function handleAvailability(availability: string | null) {
		if (!$profile.availabilities || !availability) return;
		const idx = $profile.availabilities.findIndex((ele) => ele === availability);
		if (idx === -1) $profile.availabilities.push(availability);
		else $profile.availabilities.splice(idx, 1);
		$profile = $profile;
	}
</script>

<ul
	class={cn(
		'flex flex-wrap gap-6 rounded-md border border-neutral-800 px-6 py-4 md:justify-between',
		className,
		{
			'gap-2': $isEditing,
		}
	)}
	{...$$restProps}
>
	{#each availabilities as { name }}
		{#if name}
			{#if $isEditing}
				<Button variant="ghost" size="sm" on:click={() => handleAvailability(name)}>
					<li class="flex items-center gap-2 text-sm text-neutral-200">
						{name}

						<span
							class={cn('material-symbols-outlined text-[16px] text-neutral-600', {
								'text-emerald-400': $profile.availabilities?.includes(name),
							})}
						>
							{$profile.availabilities?.includes(name) ? 'check' : 'close'}
						</span>
					</li>
				</Button>
			{:else}
				<li class="flex items-center gap-2 text-sm text-neutral-200">
					{name}

					<span
						class={cn('material-symbols-outlined text-[16px] text-neutral-600', {
							'text-emerald-400': $profile.availabilities?.includes(name),
						})}
					>
						{$profile.availabilities?.includes(name) ? 'check' : 'close'}
					</span>
				</li>
			{/if}
		{/if}
	{/each}
</ul>
