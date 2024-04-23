<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { page } from '$app/stores';
	import Label from '$lib/components/ui/label/label.svelte';

	export let data;
	$: ({ session, supabase } = data);

	let email: string = 'test@test.com';

	async function signInWithEmail(email: string) {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: 'test@test.com',
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: 'http://localhost:5173/onboarding/profile'
			}
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

	// function handleClick(email: string) {
	// 	handleMagicLink(email);
	// }
</script>

{#if session.user}
	<p>You're logged in as {session.user?.email}</p>
{:else}
	{#if redirectedFrom}
		<p>{redirectMessage}</p>
	{/if}
	<div>
		<Label>Email</Label>
		<Input bind:value={email} placeholder="Your email address" />
		<Button on:click={() => signInWithEmail(email)}>Send magic link</Button>
	</div>
{/if}
