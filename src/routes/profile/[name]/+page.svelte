<script lang="ts">
	import type { PageData } from './$types';
	import * as Profile from '$lib/components/profile';
	import { Accessibility } from 'lucide-svelte';
	import Availabilities from '$lib/components/profile/availabilities.svelte';
	import { Button } from '$lib/components/ui/button';
	import Endorse from './endorse.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { DotsThree } from 'phosphor-svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: PageData;
	let { user } = data;
	const profile = writable(data.profile.data);
	setContext('profile', profile);
	// $: ({ profile, user, supabase } = data);
</script>

<div class="container flex max-w-[50rem] flex-col gap-6 py-2">
	{#if $profile}
		<div class="flex flex-col gap-6 md:flex-row md:justify-between">
			<div class="flex w-full flex-col items-center gap-2 md:flex-row">
				<Button href="/" variant="outline" class="w-full md:w-fit">
					<span>{'<- Back to profiles'}</span>
				</Button>
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
								<Avatar.Image src={endorsement.profiles.pfp_url} />
							</Avatar.Root>
						{/each}
					</span>
					{#if $profile.endorsements.length > 3}
						<span>
							<DotsThree class="h-5 w-5 opacity-30" />
						</span>
					{/if}
				</Button>
				<Button
					variant="outline"
					class="flex w-full items-center gap-2 border-primary text-primary md:w-fit"
				>
					Contact
					<span class="material-symbols-outlined items-center gap-4 text-[20px]"> mail </span>
				</Button>
			</div>
		</div>
		<Profile.Root profile={$profile}>
			<Profile.Header />
			<Profile.Social />
			{#if data.availabilities.data}
				<Profile.Availability availabilities={data.availabilities.data} />
			{/if}
			<Profile.Stacks />
			<Profile.Projects />
		</Profile.Root>
	{/if}
</div>
