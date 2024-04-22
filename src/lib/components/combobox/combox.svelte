<script lang="ts" generics="T extends string, U extends string">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';

	import Fuse from 'fuse.js';

	interface Item {
		value: T;
		label: U;
	}
	export let data: Item[];
	export let placeholder = 'Select item...';
	export let threshold = 0.4;
	export let multiple = false;
	export let inputClassName: string | undefined;

	type ValueType<V> = V extends true ? string[] : string;
	let value: ValueType<typeof multiple> = multiple ? [] : '';

	let open = false;
	let search = '';

	export let selected: string | string[] | undefined = undefined;
	$: selected = multiple
		? data
				.filter((f) => value.includes(f.value))
				.map((f) => f.label)
				.join(', ')
		: data.find((f) => f.value === value)?.label;

	const fuse = new Fuse(data, {
		keys: ['value', 'label'],
		threshold
	});

	$: filteredItems = search ? fuse.search(search).map((res) => res.item) : data;

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
			class={cn('w-[200px] justify-between', inputClassName)}
		>
			<div class="truncate grow-0 contain-paint overflow-clip">
				{selected?.length ? selected : placeholder}
			</div>
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class={cn('w-[200px] max-h-[300px] overflow-y-auto overflow-x-hidden p-0')}>
		<Command.Root shouldFilter={false}>
			<Command.Input {placeholder} bind:value={search} />
			<Command.Empty>No item found.</Command.Empty>
			<Command.Group>
				{#each filteredItems as item}
					<Command.Item
						value={item.value}
						onSelect={(currentValue) => {
							if (Array.isArray(value)) {
								if (!value.includes(currentValue)) {
									value.push(currentValue);
									value = value;
								} else {
									const idx = value.findIndex((item) => item === currentValue);
									value.splice(idx, 1);
									value = value;
								}
							} else {
								value = currentValue;
							}

							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check
							class={cn('mr-2 h-4 w-4', {
								'text-transparent': Array.isArray(value)
									? value.every((val) => val !== item.value)
									: value !== item.value
							})}
						/>
						{item.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
