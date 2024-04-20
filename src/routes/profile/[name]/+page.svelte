<script lang="ts">
	import Endorse from '$lib/components/actions/endorse.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ profile, endorse, user, supabase } = data);
</script>

<!-- TODO add profile view-->

<Endorse data={endorse} {profile} endorser={{ name: 'testing' }}>Endorse</Endorse>
