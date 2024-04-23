<script lang="ts">
	import { goto, preloadData, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Message } from '$routes/profile/[name]/+page.server';
	import { endorseSchema, type EndorseSchema } from '$routes/profile/[name]/schema';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { Profile } from '$lib/components/profile/mock';

	let data: SuperValidated<Infer<EndorseSchema>, Message>;
	export { data as form };

	export let profile: Profile;

	// TODO put correct User type
	export let endorser: { firstName: string } | undefined = undefined;

	const form = superForm(data, {
		validators: zodClient(endorseSchema),
		id: profile.firstName,
		onUpdated: ({ form }) => {
			if (form.valid) {
				const { message } = form;
				if (!message || !message.profile) return;

				toast.success('Endorsed!', { description: `${message.text} ${message.profile.name}` });
			}
		}
	});

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
	<form method="POST" use:enhance action="/profile/{profile.firstName}?/endorse" class="!w-full">
		<input type="hidden" value={profile.firstName} name="profile" />
		<input type="hidden" value={endorser.firstName} name="endorser" />
		<button class="!w-full">
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
