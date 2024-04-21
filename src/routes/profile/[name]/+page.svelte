<script lang="ts">
	import Endorse from './endorse.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ profile, user, supabase } = data);
</script>

<!-- TODO add profile view-->

<!-- FIXME EXAMPLE -->
<Endorse form={endorse} {profile} endorser={{ name: 'testing' }}>Endorse</Endorse>
