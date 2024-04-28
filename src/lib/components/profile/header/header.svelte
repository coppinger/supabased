<script lang="ts">
	import type { ProfileSchema } from '$routes/settings/profile/schema';

	import type { SuperForm, SuperValidated } from 'sveltekit-superforms';

	import type { ProfilesResult } from '$lib/db/query';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import SocialBanner from '$lib/components/profile/social/banner.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Form from '$lib/components/ui/form';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	const profile = getContext<Writable<ProfilesResult>>('profile');
	const isEditing = getContext<Writable<boolean>>('isEditing');
	const form = getContext<SuperForm<ProfileSchema>>('form');

	let className: $$Props['class'] = undefined;
	export { className as class };

	let formData: (typeof form)['form'] | undefined;
	if (form) formData = form.form;
	const supabaseProducts = [
		{
			label: 'Database',
			Icon: Database,
		},
		{
			label: 'Auth',
			Icon: Lock,
		},
		{
			label: 'Storage',
			Icon: Cloud,
		},
		{
			label: 'Edge',
			Icon: Triangle,
		},
		{
			label: 'Realtime',
			Icon: MousePointerClick,
		},
		{
			label: 'Vector',
			Icon: Box,
		},
	];

	function handleExperience(experience: string | null) {
		if (!$profile.products || !experience) return;
		const idx = $profile.products.findIndex((ele) => ele === experience);
		if (idx === -1) $profile.products.push(experience);
		else $profile.products.splice(idx, 1);
		$profile = $profile;
	}
</script>

<div class={cn('flex flex-col gap-6', className)} {...$$restProps}>
	<div class="flex w-full items-center justify-between gap-6 md:hidden">
		{#each supabaseProducts as { Icon, label }}
			{#if $isEditing}
				<div
					class={cn('flex items-center gap-4 font-bold text-neutral-400', {
						'text-emerald-400': $profile.products?.includes(label),
					})}
				>
					<Icon class="h-5 w-5" />
				</div>
			{/if}
		{/each}
	</div>
	<div class="flex w-full items-center justify-between">
		<div class="flex w-full items-center gap-4">
			<Avatar.Root class="size-16">
				<Avatar.Image src={$profile.pfp_url} alt={$profile.display_name} />
				<Avatar.Fallback class="rounded-sm text-center text-xs">
					{$profile.display_name}
				</Avatar.Fallback>
			</Avatar.Root>
			<div>
				{#if $isEditing}
					<Form.Field {form} name="display_name">
						<Form.Control let:attrs>
							<Form.Label>Display Name</Form.Label>
							{#if $formData}
								<Input
									{...attrs}
									type="text"
									placeholder={$profile.display_name ?? 'Enter your display name'}
									name="display_name"
									class="max-h-8"
									bind:value={$formData.display_name}
								/>
							{/if}
						</Form.Control>
						<Form.Description>Your public display name.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				{:else}
					<h5
						class={cn('text-neutral-50', {
							'text-opacity-40': !$profile.display_name,
						})}
					>
						{$profile.display_name ?? 'Display Name'}
					</h5>
				{/if}
				{#if $isEditing}
					<Form.Field {form} name="location">
						<Form.Control let:attrs>
							<Form.Label>Location</Form.Label>
							{#if $formData}
								<Input
									{...attrs}
									type="text"
									placeholder={$profile.location ?? 'Enter your location...'}
									name="location"
									class="max-h-8"
									bind:value={$formData.location}
								/>
							{/if}
						</Form.Control>
						<Form.Description>Your public location.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				{:else}
					<p
						class={cn('text-neutral-600', {
							'text-opacity-60': !$profile.location,
						})}
					>
						{$profile.location ?? 'Location'}
						{$profile.timezone ? ` • ${$profile.timezone}` : ''}
					</p>
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-end justify-center gap-4">
			<div class={cn('hidden w-full gap-6 md:flex', {})}>
				{#each supabaseProducts as { Icon, label }}
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger asChild let:builder>
							<div
								use:builder.action
								{...builder}
								class={cn('flex items-center gap-6 font-bold text-neutral-400', {
									'text-emerald-400': $profile.products?.includes(label),
								})}
							>
								<Icon class="h-4 w-4" />
							</div>
						</Tooltip.Trigger>
						<Tooltip.Content>
							{label}
						</Tooltip.Content>
					</Tooltip.Root>
				{/each}
			</div>
			<SocialBanner class="hidden md:flex" />
		</div>
	</div>
</div>
