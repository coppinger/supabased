<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';

	import Fuse from 'fuse.js';

	import { Check } from 'lucide-svelte';
	import { ChevronsUpDown } from 'lucide-svelte';

	import { tick } from 'svelte';

	import { stacksMinimal } from '$lib/stacks';
	import Combox from '$lib/components/combobox/combox.svelte';

	const stacks = stacksMinimal;

	let open = false;
	let value = '';

	$: selectedValue = stacks.find((f) => f.value === value)?.label ?? 'Select a framework...';

	const fuse = new Fuse(stacks, {
		keys: ['value', 'label'],
		threshold: 0.4
	});

	let filteredStacks: typeof stacks;
	if (value) {
		filteredStacks = fuse.search(value).map((res) => res.item);
	} else {
		filteredStacks = stacks;
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
	<Popover.Content class="w-[200px] max-h-[300px] overflow-y-auto overflow-x-hidden p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each filteredStacks as framework}
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
