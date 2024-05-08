<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	import Button from '$lib/components/shadcn/ui/button/button.svelte';
	import Input from '$lib/components/shadcn/ui/input/input.svelte';

	import { page } from '$app/stores';
	import Label from '$lib/components/shadcn/ui/label/label.svelte';
	import { SocialAuth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let email: string = '';

	async function signInWithEmail(email: string) {
		const { data, error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: $page.url.origin + '/login',
			},
		});
	}

	let redirectMessage: string;
	let redirectedFrom = $page.url.searchParams.get('redirectedFrom');

	switch (redirectedFrom) {
		case 'onboarding':
			redirectMessage = "You'll need to login before you can onboard.";
			break;
		default:
			redirectMessage = 'Looks like you need to login first!';
			break;
	}

	const { form, errors, constraints, message, enhance } = superForm(data.form);

	$: email = $form.email;
</script>

<div class="mx-auto my-10 max-w-md rounded-md border border-neutral-800 p-10">
	{#if session.user}
		<p>You're logged in as {session.user?.email}</p>
	{:else}
		{#if redirectedFrom}
			<p>{redirectMessage}</p>
		{/if}
		<div class="flex flex-col gap-4">
			<form method="POST" class="flex flex-col gap-4" use:enhance>
				<Label>Email</Label>
				<Input
					type="text"
					name="email"
					bind:value={$form.email}
					aria-invalid={$errors.email ? 'true' : undefined}
					{...$constraints.email}
					placeholder="Your email address"
				/>
				{#if $errors.email}<span class=" text-[red]">{$errors.email}</span>{/if}
			</form>
			<Button on:click={() => signInWithEmail(email)}>Send magic link</Button>
		</div>
	{/if}
</div>

<!-- TODO sorry charlie, don't hate me LMAO, I'll let you make it pretty-->
<div
	class="mx-auto my-10 flex max-w-md items-center justify-center gap-2 rounded-md border border-neutral-800 px-10 py-4"
>
	<SocialAuth
		supabaseClient={supabase}
		providers={['github']}
		appearance={{
			theme: ThemeSupa,
			style: {
				button: 'background-color: hsl(var(--primary)); border-color: rgb(38 38 38)',
			},
		}}
		socialLayout="horizontal"
	/>
</div>
