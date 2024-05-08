<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SupaOrbed2 from './SupaOrbed2.svelte';
	import Scene from './Scene.svelte';
	export let speed: number = 0.6;
</script>

<Canvas>
	<Scene {speed}>
		<SupaOrbed2 />
	</Scene>
</Canvas>
