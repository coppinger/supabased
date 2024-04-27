<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { EndorsementsResult, ProfilesResult } from '$lib/db/query';
	import type { Database, Tables } from '$lib/types/DatabaseDefinitions';
	import type { SupabaseClient, User } from '@supabase/supabase-js';
	import { writable, type Writable } from 'svelte/store';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		profile: ProfilesResult;
		allowEditing?: boolean;
		isEditing?: Writable<boolean>;
		profileState?: Writable<ProfilesResult>;
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
