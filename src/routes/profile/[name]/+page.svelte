<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	// $: ({ profile, user, supabase } = data);
	$: console.log(data);
</script>

<!-- TODO add profile view-->

<!-- FIXME EXAMPLE -->
