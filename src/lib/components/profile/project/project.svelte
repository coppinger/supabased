<script lang="ts">
	import type { ProfileSchema } from '$routes/settings/profile/schema';

	import type { SuperForm, SuperValidated } from 'sveltekit-superforms';

	import type { ProfilesResult } from '$lib/db/query';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import SocialBanner from '$lib/components/profile/social/banner.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Form from '$lib/components/ui/form';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	const profile = getContext<Writable<ProfilesResult>>('profile');

	let className: $$Props['class'] = undefined;
	export { className as class };

	const supabaseProducts = [
		{
			label: 'Database',
			Icon: Database,
		},
		{
			label: 'Auth',
			Icon: Lock,
		},
		{
			label: 'Storage',
			Icon: Cloud,
		},
		{
			label: 'Edge',
			Icon: Triangle,
		},
		{
			label: 'Realtime',
			Icon: MousePointerClick,
		},
		{
			label: 'Vector',
			Icon: Box,
		},
	];

	function handleExperience(experience: string | null) {
		if (!$profile.products || !experience) return;
		const idx = $profile.products.findIndex((ele) => ele === experience);
		if (idx === -1) $profile.products.push(experience);
		else $profile.products.splice(idx, 1);
		$profile = $profile;
	}
</script>

{#each $profile.projects as project}
	<div
		class={cn('flex w-full flex-col gap-6 rounded-md border border-neutral-800 p-6', className)}
		{...$$restProps}
	>
		<div class="flex w-full items-center justify-between gap-6 md:hidden">
			{#each supabaseProducts as { Icon, label }}
				<div
					class={cn('flex items-center gap-4 font-bold text-neutral-400', {
						'text-primary': project.projects_products.some(
							(product) => product.product.name === label
						),
					})}
				>
					<Icon class="h-5 w-5" />
				</div>
			{/each}
		</div>
		<div class="flex w-full items-center justify-between">
			<div class="flex w-full items-center gap-4">
				{project.project_name}
				{#if project.project_url}
					<Button href={project.project_url} variant="link">
						{project.project_url}
					</Button>
				{/if}
			</div>
			<div class="flex flex-col items-end justify-center gap-4">
				<div class={cn('hidden w-full gap-6 md:flex', {})}>
					{#each supabaseProducts as { Icon, label }}
						<Tooltip.Root openDelay={0}>
							<Tooltip.Trigger asChild let:builder>
								<div
									use:builder.action
									{...builder}
									class={cn('flex items-center gap-6 font-bold text-neutral-400', {
										'text-primary': project.projects_products.some(
											(product) => product.product.name === label
										),
									})}
								>
									<Icon class="h-4 w-4" />
								</div>
							</Tooltip.Trigger>
							<Tooltip.Content>
								{label}
							</Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>

				<SocialBanner class="hidden md:flex" />
			</div>
		</div>

		{#if project.projects_stacks.length}
			<Separator />
			<ul class="flex flex-wrap gap-4">
				{#each project.projects_stacks as stacks}
					<li
						class="flex items-center justify-center rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-600"
					>
						{stacks.stack.name}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/each}
