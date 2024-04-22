<script lang="ts">
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	const supabaseProducts = [
		{
			label: 'Database',
			Icon: Database
		},
		{
			label: 'Auth',
			Icon: Lock
		},
		{
			label: 'Storage',
			Icon: Cloud
		},
		{
			label: 'Edge',
			Icon: Triangle
		},
		{
			label: 'Realtime',
			Icon: MousePointerClick
		},
		{
			label: 'Vector',
			Icon: Box
		}
	];
</script>

<div class="border-b border-neutral-800">
	<div
		class="max-w-screen-xl mx-auto p-4 md:py-6 md:px-20 flex items-center justify-between flex-wrap gap-4"
	>
		{#each supabaseProducts as { label, Icon }}
			<div class="flex gap-4 items-center text-emerald-400 font-bold">
				{label}
				<Icon class="h-4 w-4" />
			</div>
		{/each}
	</div>
</div>
