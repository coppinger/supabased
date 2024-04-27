<script context="module" lang="ts">
	let realtime: ReturnType<SupabaseClient['channel']> | undefined;
	let components = writable(
		new Map<ReturnType<typeof crypto.randomUUID>, Writable<ProfilesResult>>()
	);
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { endorseSchema, type EndorseSchema } from '$routes/profile/[name]/schema';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	import type { EndorsementsResult, ProfilesResult } from '$lib/db/query';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { getContext, onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Tables } from '$lib/types/DatabaseDefinitions';

	type $$Props = HTMLFormAttributes;

	let profile = getContext<Writable<ProfilesResult>>('profile');

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

	const id = crypto.randomUUID();

	onMount(() => {
		$components.set(id, profile);
		$components = $components;

		if (!realtime) {
			realtime = supabase
				.channel('endorsements')
				.on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'endorsements',
					},
					async (payload) => {
						const { endorsement_to, endorsed_by } = payload.new;
						for (const [_, _profile] of $components) {
							if (endorsement_to === get(_profile).id) {
								const { data, error } = await supabase
									.from('profiles')
									.select()
									.eq('id', endorsed_by)
									.single<Tables<'profiles'>>();
								if (!error)
									_profile.update((profile) => {
										profile.endorsements.push({
											...payload.new,
											profiles: data,
										} as EndorsementsResult);
										return profile;
									});
							}
							$components = $components;
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
						for (const [_, _profile] of $components) {
							const idx = get(_profile).endorsements.findIndex((ele) => ele.id === id);

							if (idx !== -1) {
								_profile.update((profile) => {
									profile.endorsements.splice(idx, 1);
									return profile;
								});
							}
							$components = $components;
						}
					}
				)
				.subscribe();
		}

		// // clean up
		return () => {
			$components.delete(id);
			$components = $components;
			if ($components.size === 0) {
				realtime?.unsubscribe();
				realtime = undefined;
			}
		};
	});
</script>

<!-- 
@component
Form Action wrapper.

@props
data: SuperValidated<Infer<EndorseSchema>, Message>;
// TODO put correct Profile type
export let profile: { name: any };
// TODO put correct Profile type
export let endorser: { name: any };

Usage:
```svelte
<Endorse data={form} {profile} {endorser}>
	<EndorseButton />
</Endorse> 
```
-->

{#if user?.id}
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
{:else}
	<Dialog.Root>
		<Dialog.Trigger class="w-full">
			<slot />
		</Dialog.Trigger>
		<Dialog.Content>
			<!-- TODO update with actual auth component -->
			<!-- Touch action none on mobile -->
			<div class="flex place-content-center">
				<div class="">
					<Auth
						supabaseClient={$page.data.supabase}
						providers={['google', 'github', 'twitter']}
						redirectTo={`${$page.url.origin}/auth/callback`}
						showLinks={false}
						appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
						socialLayout="horizontal"
					/>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
