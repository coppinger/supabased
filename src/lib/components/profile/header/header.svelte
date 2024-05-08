<script lang="ts">
	import { VALIDATIONS, type ProfileSchema } from '$routes/settings/profile/schema';
	import { fileProxy, type SuperForm } from 'sveltekit-superforms';
	import { cn } from '$lib/components/shadcn/utils';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import SocialBanner from '$lib/components/profile/social/banner.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Input from '$lib/components/shadcn/ui/input/input.svelte';
	import * as Tooltip from '$lib/components/shadcn/ui/tooltip';
	import * as Form from '$lib/components/shadcn/ui/form';
	import { page } from '$app/stores';
	import { CircleNotch } from 'phosphor-svelte';
	import type { PageData } from '../../../../routes/$types';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	const profile =
		getContext<Writable<NonNullable<NonNullable<PageData['user']>['profile']['data']>>>('profile');
	const isEditing = getContext<Writable<boolean>>('isEditing');
	const form = getContext<SuperForm<ProfileSchema> | undefined>('form');

	let className: $$Props['class'] = undefined;
	export { className as class };

	let formData: NonNullable<typeof form>['form'] | undefined;
	let errors: NonNullable<typeof form>['errors'] | undefined;
	let constraints: NonNullable<typeof form>['constraints'] | undefined;

	$: if (form) {
		formData = form.form;
		errors = form.errors;
		constraints = form.constraints;
	}

	// if (formData) $formData.username = $profile.username!;
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

	//@ts-expect-error
	let file: ReturnType<typeof fileProxy<NonNullable<typeof form>, 'pfp_url'>>;
	if (form) file = fileProxy(form, 'pfp_url');

	let pfpEle: HTMLInputElement;
	let avatar: string | ArrayBuffer | null | undefined;
	$: if ($file && pfpEle?.files?.[0]) {
		const reader = new FileReader();
		reader.readAsDataURL(pfpEle.files[0]);
		reader.onload = (e) => {
			avatar = e.target?.result;
		};
	}

	let checking = false;
	let timer: ReturnType<typeof setTimeout>;
	const debounce = () => {
		if (!isUsernameLengthGreaterThanMinContrainst()) return;
		checking = true;
		clearTimeout(timer);
		timer = setTimeout(async () => {
			if (!$formData) return;
			await handleUsernameChange($formData.username);
			checking = false;
		}, 750);
	};

	async function handleUsernameChange(username?: string) {
		if (!username) return;

		const { data, error } = await $page.data.supabase
			.from('profiles')
			.select('username')
			.eq('username', username)
			.maybeSingle();
		if (data && $errors) {
			$errors.username = [VALIDATIONS.USERNAME.FAIL];
		}
	}

	// putting the Java in JavaScript am I right? haha you can thank devdad smh.
	function isUsernameLengthGreaterThanMinContrainst() {
		if (!$formData?.username || !$constraints) return;
		const { length } = $formData.username;
		return !($constraints.username?.minlength && length < $constraints.username.minlength);
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
				{#if form && $formData && $isEditing}
					<Form.Field {form} name="pfp_url">
						<Form.Control let:attrs>
							{#if $formData}
								<input
									{...attrs}
									type="file"
									class="hidden max-h-8"
									bind:files={$file}
									bind:this={pfpEle}
								/>
							{/if}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
				{#if avatar && typeof avatar === 'string'}
					<button
						type="button"
						class="size-full"
						on:click={() => {
							if ($isEditing) pfpEle?.click();
						}}
					>
						<Avatar.Image src={avatar} alt={$profile.display_name} />
					</button>
				{:else}
					<button
						type="button"
						class={cn('size-full', {
							'cursor-default': !$isEditing,
						})}
						on:click={() => {
							if ($isEditing) pfpEle?.click();
						}}
					>
						<Avatar.Image src={$profile.pfp_url} alt={$profile.display_name} />
					</button>
				{/if}
				<Avatar.Fallback class="rounded-sm text-center text-xs">
					{$profile.display_name}
				</Avatar.Fallback>
			</Avatar.Root>
			<div
				class={cn('flex flex-col', {
					'flex-row gap-2': $isEditing,
				})}
			>
				{#if form && $formData && $errors && $isEditing}
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
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.username}
								on:input={debounce}
								placeholder={`${$formData.username || $profile.username}`}
								class="relative max-h-8 before:absolute before:left-5 before:top-5 before:contents before:content-['@']"
							/>
						</Form.Control>
						<Form.Description>
							{#if checking && !$errors.username}
								<div class="flex items-center gap-2 text-muted-foreground">
									<CircleNotch class="animate-spin" size="1rem" />
									<p>Checking username availability...</p>
								</div>
							{:else if !checking && !$errors.username?.length && isUsernameLengthGreaterThanMinContrainst()}
								<div class="flex items-center gap-2 text-green-500">
									<p>{VALIDATIONS.USERNAME.SUCCESS}</p>
								</div>
							{/if}
						</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
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
					<div class="flex gap-2">
						<h5
							class={cn('text-neutral-50', {
								'text-opacity-40': !$profile.display_name,
							})}
						>
							{$profile.display_name ?? 'Display Name'}
						</h5>
						<small
							class={cn('place-self-center text-neutral-600', {
								'text-opacity-60': !$profile.username,
							})}
						>
							@{$profile.username}
						</small>
					</div>
					<p
						class={cn('text-neutral-600', {
							'text-opacity-60': !$profile.location,
						})}
					>
						{$profile.location ?? ''}
						{$profile.timezone ? ` • ${$profile.timezone}` : ''}
					</p>
				{/if}
			</div>
		</div>
		{#if !$isEditing}
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
		{/if}
	</div>
</div>
