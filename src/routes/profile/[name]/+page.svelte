<script lang="ts">
	import type { PageData } from './$types';
	import * as Profile from '$lib/components/profile';
	import { Accessibility } from 'lucide-svelte';
	import Availabilities from '$lib/components/profile/availabilities.svelte';

	export let data: PageData;
	console.log(data);

	// $: ({ profile, user, supabase } = data);
</script>

{#if data.profile.data}
	<Profile.Root profile={data.profile.data}>
		<Profile.Header />
		<Profile.Products />
		{#if data.availabilities.data}
			<Profile.Availability availabilities={data.availabilities.data} />
		{/if}
		<Profile.Stacks />
	</Profile.Root>
{/if}
