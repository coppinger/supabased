<script lang="ts">
	import Table from './table.svelte';

	export let data;

	let { repos, projects } = data;
	$: ({ repos, projects } = data);
</script>

{#if projects.data}
	<div class="container">
		{#key projects.data}
			<Table projects={projects.data} {repos} />
		{/key}
	</div>
{/if}
