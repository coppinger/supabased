<script lang="ts">
	import { menuBoolean } from '$lib/menuStore';
</script>

<button
	on:click={() => menuBoolean.update((value) => !value)}
	aria-label="Open nav menu"
	class="p-2"
>
	<span class="material-symbols-outlined text-[20px]">lunch_dining</span>
</button>
