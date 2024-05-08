<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { cn } from '$lib/components/shadcn/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PageData } from '../../../routes/$types';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		profile: PageData['user']['profile']['data'];
		allowEditing?: boolean;
		isEditing?: Writable<boolean>;
		profileState?: Writable<PageData['user']['profile']['data']>;
	};
	export let profile: $$Props['profile'];
	export let allowEditing: $$Props['allowEditing'] = false;
	export let isEditing: $$Props['isEditing'] = writable(false);
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let profileState: $$Props['profileState'] = writable(profile);

	setContext('profile', profileState);
	if (allowEditing) setContext('isEditing', isEditing);
</script>

<div
	class={cn('flex w-full flex-col gap-6 rounded-md border border-neutral-800 p-6', className)}
	{...$$restProps}
>
	<slot />
</div>
