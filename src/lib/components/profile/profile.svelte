<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import Endorse from '$routes/profile/[name]/endorse.svelte';
	import { capitalize } from 'lodash-es';
	import { CheckIcon, Globe, Linkedin, Twitter, X } from 'lucide-svelte';
	import { DotsThree, GithubLogo } from 'phosphor-svelte';
	import { allAvailabilities } from '$lib/components/profile/data';
	import Project from '$lib/components/profile/project/project.svelte';
	import { page } from '$app/stores';
	import type { Tables } from '$lib/types/DatabaseDefinitions';

	export let profile: Tables<'profiles'> & { projects: Tables<'projects'>[] };

	$: ({ endorse } = $page.data);
</script>

<div class="rounded-xl border p-6 space-y-8">
	<div class="w-full flex items-center justify-between">
		<div class="flex gap-2">
			<Avatar class="h-12 w-12">
				<AvatarImage src={profile.pfp_url} alt={profile.display_name} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<h5>{profile.display_name}</h5>
				<p class="text-foreground text-opacity-40">
					<!-- {capitalize(profile.)} Developer -->
				</p>
			</div>
		</div>
		<div>
			<div class="flex gap-2 items-center justify-end">
				<a href={''} target="_blank">
					<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
						<Twitter class="h-5 w-5" />
					</Button>
				</a>
				{#if Boolean(profile.github_username)}
					<a href={profile.github_username} target="_blank">
						<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
							<GithubLogo class="h-5 w-5" />
						</Button>
					</a>
				{/if}
				<a href={''} target="_blank">
					<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
						<Globe class="h-5 w-5" />
					</Button>
				</a>
				<a href={''} target="_blank">
					<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
						<Linkedin class="h-5 w-5" />
					</Button>
				</a>
			</div>
			<p class="text-foreground text-opacity-40 text-sm">UTC-08:00 - Australia</p>
		</div>
	</div>
	<div class="text-lg">{profile.bio}</div>
	<div class="flex items-center gap-4 flex-wrap">
		{#each allAvailabilities as availability}
			{#if profile.availibility?.includes(availability)}
				<div class="flex gap-2 items-center">
					{availability}
					<CheckIcon class="text-primary" />
				</div>
			{:else}
				<div class="flex gap-2 items-center opacity-30">
					{availability}
					<X class="h-5 w-5" />
				</div>
			{/if}
		{/each}
	</div>
	<Separator />
	<div class="flex justify-between items-center">
		<Endorse form={endorse} {profile}>
			<Button variant="outline" class="">Endorse 🫡</Button>
		</Endorse>
		<Button variant="ghost" class="gap-2">
			<span class="flex gap-1">
				<span class="text-opacity-40">
					<!-- {profile.endorsement_num} -->
				</span>
				<span>🫡</span>
			</span>
			<span class="flex -space-x-2">
				<Avatar class="h-8 w-8 border-2 border-background">
					<AvatarImage src="https://i.kym-cdn.com/photos/images/original/002/307/265/9a6" />
				</Avatar>
				<Avatar class="h-8 w-8 border-2 border-background">
					<AvatarImage src="https://i.redd.it/l0m6jy5zqwxa1.png" />
				</Avatar>
				<Avatar class="h-8 w-8 border-2 border-background">
					<AvatarImage src="https://media.tenor.com/Mfk5cU9Jdg8AAAAe/chad-face-chad.png" />
				</Avatar>
			</span>
			<span>
				<DotsThree class="w-5 h-5 opacity-30" />
			</span>
		</Button>
	</div>
	<!-- TODO needs projects data -->
	{#if profile.projects}
		{#each profile.projects as project}
			<Project {project} />
		{/each}
	{/if}
	<div class="text-">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
</div>
