<script lang="ts">
	import type { ProfilesResult } from '$lib/db/query';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	const profile = getContext<ProfilesResult>('profile');
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<ul class={cn('flex gap-6 text-2xl text-neutral-600 md:text-base', className)} {...$$restProps}>
	{#if profile.github_username}
		<li class="transition-all duration-300 ease-linear hover:text-neutral-50">
			<a href={`https://github.com/${profile.github_username}`} target="_blank">
				<iconify-icon icon="mdi:github"></iconify-icon>
			</a>
		</li>
	{/if}
	{#if profile.linkedin_url}
		<li class="transition-all duration-300 ease-linear hover:text-neutral-50">
			<a href={profile.linkedin_url} target="_blank">
				<iconify-icon icon="mdi:linkedin"></iconify-icon>
			</a>
		</li>
	{/if}

	{#if profile.twitter_username}
		<li class="transition-all duration-300 ease-linear hover:text-neutral-50">
			<a href={`https://twitter.com/${profile.twitter_username}`} target="_blank">
				<iconify-icon icon="mdi:twitter"></iconify-icon>
			</a>
		</li>
	{/if}

	{#if profile.website_url}
		<li class="transition-all duration-300 ease-linear hover:text-neutral-50">
			<a href={profile.website_url} target="_blank">
				<iconify-icon icon="mdi:globe"></iconify-icon>
			</a>
		</li>
	{/if}
</ul>
