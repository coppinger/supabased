<script lang="ts">
	import { Button } from '$lib/components/shadcn/ui/button';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { getContext } from 'svelte';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import { DotsThree } from 'phosphor-svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from '../../../../routes/$types';

	const profile = getContext<Writable<NonNullable<PageData['user']['profile']['data']>>>('profile');
</script>

<div class="flex flex-col gap-6 md:flex-row md:justify-between">
	<Button variant="outline" class="flex items-center gap-2">
		Contact
		<span class="material-symbols-outlined items-center gap-4 text-[20px]"> mail </span>
	</Button>
	<div class="flex w-full flex-col items-center gap-2 md:flex-row">
		<Endorse>
			<Button variant="outline" class="w-full md:w-fit">Endorse 🫡</Button>
		</Endorse>
		<Button
			variant="ghost"
			class="w-full grow justify-center gap-2 md:w-[17.25rem] md:justify-start"
		>
			<span class="flex min-w-32 gap-1">
				<p>Endorsed by</p>
				<span>🫡</span>
				<span class="whitespace-pre">
					{$profile.endorsements.length.toString().padStart(4)}
				</span>
			</span>
			<span class="flex -space-x-2">
				{#each $profile.endorsements as endorsement, _ (endorsement.id)}
					<Avatar.Root class="h-8 w-8 border-2 border-background">
						<Avatar.Image src={endorsement.profile?.pfp_url} />
					</Avatar.Root>
				{/each}
			</span>
			{#if $profile.endorsements.length > 3}
				<span>
					<DotsThree class="h-5 w-5 opacity-30" />
				</span>
			{/if}
		</Button>
		{#if $profile.projects.length > 0}
			<Button
				href="/profile/{$profile.username}"
				variant="outline"
				class="border-emer w-full text-emerald-400 md:w-fit"
			>
				View {$profile.projects.length} project{$profile.projects.length > 1 ? 's' : ''} ->
			</Button>
		{:else}
			<div class="w-full"></div>
		{/if}
	</div>
</div>
