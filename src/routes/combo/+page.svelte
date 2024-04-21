<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';

	import Fuse from 'fuse.js';

	// ignoring until ts figures its shiz out
	// @ts-ignore
	import Check from 'lucide-svelte/icons/check';
	// @ts-ignore
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

	import { tick } from 'svelte';

	import { stacksMinimal } from '$lib/stacks';
	import Combox from '$lib/components/combobox/combox.svelte';

	const stacks = stacksMinimal;
	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next.js',
			label: 'Next.js'
		},
		{
			value: 'nuxt.js',
			label: 'Nuxt.js'
		},
		{
			value: 'remix',
			label: 'Remix'
		},
		{
			value: 'astro',
			label: 'Astro'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue = frameworks.find((f) => f.value === value)?.label ?? 'Select a framework...';

	const fuse = new Fuse(frameworks, {
		keys: ['value', 'label'],
		threshold: 0.4
	});

	let filteredFrameworks: typeof frameworks;
	if (value) {
		filteredFrameworks = fuse.search(value).map((res) => res.item);
	} else {
		filteredFrameworks = frameworks;
	}

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each filteredFrameworks as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')} />
						{framework.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

<Combox data={stacks} multiple={true} />
