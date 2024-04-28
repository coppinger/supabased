<script lang="ts">
	import type { ProfilesResult } from '$lib/db/query';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const profile = getContext<Writable<ProfilesResult>>('profile');
</script>

<ul class="flex flex-wrap gap-4">
	{#if profile}
		{@const { stacks } = $profile}
		{#if stacks}
			{#each stacks as stack (stack)}
				<li
					class="flex items-center justify-center rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-600"
				>
					{stack}
				</li>
			{/each}
		{/if}
	{/if}
</ul>
