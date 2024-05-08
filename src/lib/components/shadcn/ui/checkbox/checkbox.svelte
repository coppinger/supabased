<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	//@ts-expect-error
	import Check from 'lucide-svelte/icons/check';
	//@ts-expect-error
	import Minus from 'lucide-svelte/icons/minus';
	import { cn } from '$lib/components/shadcn/utils.js';
	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	let className: $$Props['class'] = undefined;
	export let checked: $$Props['checked'] = false;
	export { className as class };
</script>

<CheckboxPrimitive.Root
	class={cn(
		'peer box-content h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-foreground data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50',
		className,
		$$restProps.tabindex === 0 ? 'border-foreground' : 'border-neutral-800'
	)}
	bind:checked
	{...$$restProps}
	on:click
>
	<CheckboxPrimitive.Indicator
		class={cn('flex h-4 w-4 items-center justify-center text-current')}
		let:isChecked
		let:isIndeterminate
	>
		{#if isChecked}
			<Check class="h-3.5 w-3.5" />
		{:else if isIndeterminate}
			<Minus class="h-3.5 w-3.5" />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
