<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const profileData = data.supabase.from('profiles').select(`
	    *,
	    profile_availability_types(
	      *,
	      availability_types (id, name)
	    ),
	    profiles_roles(
	      *,
	      roles (id, name)
	    ),
	    projects(
	      *,
	      projects_stacks(stack_id)
	    )
	  `);
</script>

<!-- <div>{JSON.stringify(profiles)}</div> -->

{#await profileData}
	<p>Loading...</p>
{:then data}
	{console.log(data.data)}
{/await}
