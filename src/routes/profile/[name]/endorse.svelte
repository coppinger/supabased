<script lang="ts">
	import { page } from '$app/stores';
	import type { Message } from '$routes/profile/[name]/+page.server';
	import { endorseSchema, type EndorseSchema } from '$routes/profile/[name]/schema';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	import type { ProfilesResult } from '$lib/db/query';

	let data: SuperValidated<Infer<EndorseSchema>, Message>;
	export { data as form };

	export let profile: ProfilesResult;
	export let endorser: PageData['user'] | undefined = undefined;

	const form = superForm(data, {
		validators: zodClient(endorseSchema),
		id: profile.github_username ?? profile.display_name ?? crypto.randomUUID(),
		invalidateAll: false,
		onUpdated: ({ form }) => {
			if (form.valid) {
				const { message } = form;
				if (!message) return;

				toast.success('Endorsed!', { description: `${message.text}` });
			} else {
				toast.error('Error');
			}
		},
		onError: ({ result }) => {
			toast.error('error');
		}
	});
	$: console.log(endorser);

	const { form: formData, enhance } = form;
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

{#if endorser}
	<form
		method="POST"
		use:enhance
		action="/profile/{profile.github_username}?/endorse"
		class="!w-full"
	>
		<input type="hidden" value={profile.id} name="profile" />
		<input type="hidden" value={endorser.id} name="endorser" />
		<button class="!w-full" tabindex={-1}>
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
