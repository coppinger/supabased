<script lang="ts">
	import { page } from '$app/stores';
	import type { Message } from '$routes/profile/[name]/+page.server';
	import { endorseSchema, type EndorseSchema } from '$routes/profile/[name]/schema';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<EndorseSchema>, Message>;
	// TODO put correct Profile type
	export let profile: { name: any };
	// TODO put correct Profile type
	export let endorser: { name: any };

	const form = superForm(data, {
		validators: zodClient(endorseSchema),
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

<form method="POST" use:enhance action="/profile/{$page.params.name}?/endorse">
	<input type="hidden" value={profile.name} name="profile" />
	<input type="hidden" value={endorser.name} name="endorser" />
	<button>
		<slot />
	</button>
</form>
