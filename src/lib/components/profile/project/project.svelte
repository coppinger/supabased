<script lang="ts">
	import { GithubLogo } from 'phosphor-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Link2 } from 'lucide-svelte';
	import { supabaseTech } from '$lib/components/profile/data';
	import { cn } from '$lib/utils';
	import type { Tables } from '$lib/types/DatabaseDefinitions';

	export let project: Tables<'projects'>;
</script>

<div class="border rounded-xl p-4 space-y-4 text-sm">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2 flex-wrap">
			<h4>{project.project_name}</h4>
			<h6 class="text-foreground text-opacity-40">{project.project_url}</h6>
		</div>
		<div class="flex items-center gap-2">
			{#each supabaseTech as { Icon, name }}
				<Icon
					class={cn(
						'h-4 w-4 ml-2',
						project.project_name?.includes(name)
							? 'text-primary'
							: 'text-foreground text-opacity-40'
					)}
				/>
			{/each}
		</div>
	</div>
	<p class="text-muted-foreground">{project.description}</p>
	<Separator />
	<div class="flex items-center justify-between">
		<div class="flex gap-2 items-center">
			<Badge
				variant="outline"
				class="rounded-[8px] py-1 font-normal text-md text-foreground text-opacity-40"
				>React.js</Badge
			>
			<Badge
				variant="outline"
				class="rounded-[8px] py-1 font-normal text-md text-foreground text-opacity-40"
				>Next.js</Badge
			>
			<Badge
				variant="outline"
				class="rounded-[8px] py-1 font-normal text-md text-foreground text-opacity-40"
				>Tailwind</Badge
			>
		</div>
		<div class="flex gap-2 items-center text-foreground text-opacity-30">
			{#if Boolean(project.repository_url)}
				<a href={project.repository_url} target="_blank">
					<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
						<GithubLogo class="h-5 w-5" />
					</Button>
				</a>
			{/if}
			<a href={project.project_url} target="_blank">
				<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
					<Link2 class="h-5 w-5" />
				</Button>
			</a>
		</div>
	</div>
</div>
