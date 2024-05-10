<script lang="ts">
	import { page } from '$app/stores';
	import { endorseSchema } from '$routes/profile/[name]/schema';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { getContext, onMount } from 'svelte';
	import { get, type Writable } from 'svelte/store';
	import type { Tables } from '$lib/types/DatabaseDefinitions';
	import type { NonNullableFields } from '$lib/utils';

	type $$Props = HTMLFormAttributes;

	const profile = getContext<Writable<NonNullable<PageData['user']['profile']['data']>>>('profile');

	let { user, endorse: data, supabase } = $page.data as PageData;
	$: ({ user, endorse: data, supabase } = $page.data);

	const form = superForm(data, {
		validators: zodClient(endorseSchema),
		id: $profile.github_username ?? $profile.display_name ?? crypto.randomUUID(),
		invalidateAll: false,
		onUpdated: ({ form }) => {
			if (form.valid) {
				const { message } = form;
				if (!message) return;
				const { status } = message;
				if (status === 'success')
					toast.success('Endorsement Action', { description: `${message.text}` });
				if (status === 'error') toast.error('Oops!', { description: message.text });
			} else {
				toast.error('Error');
			}
		},
		onError: ({ result: { error } }) => {
			toast.error('error', {
				description: error.message,
			});
		},
	});

	const { form: formData, enhance } = form;

	onMount(() => {
		const rt = supabase
			.channel(`${$profile.id}`)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'endorsements',
					filter: `endorsement_to=eq.${$profile.id}`,
				},
				async (payload) => {
					const { endorsed_by } = payload.new as NonNullableFields<Tables<'endorsements'>>;
					const { data, error } = await supabase
						.from('profiles')
						.select()
						.eq('id', endorsed_by)
						.single();
					if (data) {
						profile.update(($profile) => {
							//@ts-expect-error
							$profile.endorsements.push({
								...payload.new,
								profile: data,
							});
							return $profile;
						});
					}
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'DELETE',
					schema: 'public',
					table: 'endorsements',
				},
				(payload) => {
					const { id } = payload.old;
					const idx = get(profile).endorsements.findIndex((ele) => ele.id === id);
					if (idx === -1) return;
					profile.update(($profile) => {
						$profile.endorsements.splice(idx, 1);
						return $profile;
					});
				}
			)
			.subscribe();

		return () => {
			rt.unsubscribe();
		};
	});
</script>

<!-- 
@component
Form Action wrapper.

@props
data: SuperValidated<Infer<EndorseSchema>, Message>;

Usage:
```svelte
<Endorse data={form} {profile} {endorser}>
	<EndorseButton />
</Endorse> 
```
-->

{#if user?.id}
	{#if user?.id !== $profile.id}
		<form
			method="POST"
			use:enhance
			action="/profile/{$profile.username}?/endorse"
			class="!w-full md:!w-fit"
		>
			<input type="hidden" value={$profile.id} name="profile" />
			<button class="!w-full md:!w-fit" tabindex={-1}>
				<slot />
			</button>
		</form>
	{/if}
{:else}
	<Dialog.Root>
		<Dialog.Trigger class="w-full">
			<slot />
		</Dialog.Trigger>
		<Dialog.Content>
			<div class="flex place-content-center">
				<div class="">
					<Auth
						supabaseClient={$page.data.supabase}
						providers={['github']}
						redirectTo={`${$page.url.origin}/auth/callback`}
						showLinks={false}
						magicLink={false}
						onlyThirdPartyProviders={true}
						appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
						socialLayout="horizontal"
					/>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
