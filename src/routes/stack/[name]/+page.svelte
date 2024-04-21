<script lang="ts">
	import { page } from '$app/stores';
	import Form from './form.svelte';
	export let data;

	$: ({ form } = data);
</script>

<!-- TODO add a view to handle unknown stack names? -->

Ooops! Did we miss {$page.params.name}? Suggest it to us here!
<Form {form} username={'testing'} />
