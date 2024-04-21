<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import { capitalize } from 'lodash-es';
	import {
		Box,
		CheckIcon,
		Database,
		Globe,
		Link2,
		Linkedin,
		Lock,
		Menu,
		MousePointerClick,
		Triangle,
		Twitter,
		X
	} from 'lucide-svelte';
	import { DotsThree, GithubLogo } from 'phosphor-svelte';

	const allAvailabilities = ['Full Time', 'Part Time', 'Contract', 'Consulting', 'Task', 'MVP'];

	const profiles = [
		{
			firstName: 'James',
			lastName: 'Coffee',
			profile_pic: 'https://github.com/shadcn.png',
			devType: 'full_stack',
			city: 'Melbourne',
			country: 'Australia',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			endorsement_num: 37,
			availabilities: ['Full Time', 'Consulting', 'Task', 'MVP'],
			twitter: 'james_coffee',
			github: 'james_coffee',
			projects: [
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					github: 'https://github.com/meta-llama/llama3',
					link: 'https://llama.meta.com/'
				},
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					link: 'https://www.shadcn-svelte.com/docs/components/button#link-1'
				}
			]
		},
		{
			firstName: 'James',
			lastName: 'Coffee',
			profile_pic: 'https://github.com/shadcn.png',
			devType: 'full_stack',
			city: 'Melbourne',
			country: 'Australia',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			endorsement_num: 37,
			availabilities: ['Full Time', 'Consulting', 'Task', 'MVP'],
			twitter: 'james_coffee',
			github: 'james_coffee',
			projects: [
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'DB', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					github: 'https://github.com/meta-llama/llama3',
					link: 'https://llama.meta.com/'
				},
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					link: 'https://www.shadcn-svelte.com/docs/components/button#link-1'
				}
			]
		},
		{
			firstName: 'James',
			lastName: 'Coffee',
			profile_pic: 'https://github.com/shadcn.png',
			devType: 'full_stack',
			city: 'Melbourne',
			country: 'Australia',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			endorsement_num: 37,
			availabilities: ['Full Time', 'Consulting', 'Task', 'MVP'],
			twitter: 'james_coffee',
			github: 'james_coffee',
			projects: [
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					github: 'https://github.com/meta-llama/llama3',
					link: 'https://llama.meta.com/'
				},
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					link: 'https://www.shadcn-svelte.com/docs/components/button#link-1'
				}
			]
		},
		{
			firstName: 'James',
			lastName: 'Coffee',
			profile_pic: 'https://github.com/shadcn.png',
			devType: 'full_stack',
			city: 'Melbourne',
			country: 'Australia',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			endorsement_num: 37,
			availabilities: ['Full Time', 'Consulting', 'Task', 'MVP'],
			twitter: 'james_coffee',
			github: 'james_coffee',
			projects: [
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					github: 'https://github.com/meta-llama/llama3',
					link: 'https://llama.meta.com/'
				},
				{
					name: 'ASX Bot',
					url: 'https://www.asxbot.com',
					usedTech: ['Vector', 'Auth', 'Edge'],
					description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
					link: 'https://www.shadcn-svelte.com/docs/components/button#link-1'
				}
			]
		}
	];

	const supabaseTech = [
		{
			name: 'DB',
			Icon: Database
		},
		{
			name: 'Auth',
			Icon: Lock
		},
		{
			name: 'Edge',
			Icon: Triangle
		},
		{
			name: 'Realtime',
			Icon: MousePointerClick
		},
		{
			name: 'Vector',
			Icon: Box
		}
	];
</script>

<div class="">
	<div class="border-b h-16 px-10 w-full">
		<div class="container flex items-center justify-between h-full">
			<div>SUPABASE<span class="text-green-400">D</span></div>
			<Menu />
		</div>
	</div>
	<div class="p-10 w-full space-y-8">
		<div class="flex items-center justify-between max-w-3xl mx-auto">
			<Button
				variant="outline"
				size="lg"
				class="rounded-full text-primary justify-between gap-4 px-4"
			>
				DB <Database class="ml-2" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="rounded-full text-primary justify-between gap-4 px-4"
			>
				Auth <Lock class="ml-2" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="rounded-full text-primary justify-between gap-4 px-4"
			>
				Edge <Triangle class="ml-2" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="rounded-full text-primary justify-between gap-4 px-4"
			>
				Realtime <MousePointerClick class="ml-2" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="rounded-full text-primary justify-between gap-4 px-4"
			>
				Vector <Box class="ml-2" />
			</Button>
		</div>
		<div class="container mx-auto w-full flex gap-4">
			<div class="w-1/3 space-y-3">
				<h1 class="text-4xl">A community of folks building with Supabase.</h1>
				<h3 class="text-lg text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</h3>
			</div>
			<div class="w-2/3 space-y-4">
				{#each profiles as profile}
					<div class="rounded-xl border p-6 space-y-8">
						<div class="w-full flex items-center justify-between">
							<div class="flex gap-2">
								<Avatar class="h-12 w-12">
									<AvatarImage src={profile.profile_pic} alt={profile.firstName} />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div>
									<h5>{profile.firstName} {profile.lastName}</h5>
									<p class="text-foreground text-opacity-40">
										{capitalize(profile.devType.replaceAll('_', ' '))} Developer
									</p>
								</div>
							</div>
							<div>
								<div class="flex gap-2 items-center justify-end">
									<a href={''} target="_blank">
										<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
											<Twitter class="h-5 w-5" />
										</Button>
									</a>
									{#if Boolean(profile.github)}
										<a href={profile.github} target="_blank">
											<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
												<GithubLogo class="h-5 w-5" />
											</Button>
										</a>
									{/if}
									<a href={''} target="_blank">
										<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
											<Globe class="h-5 w-5" />
										</Button>
									</a>
									<a href={''} target="_blank">
										<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
											<Linkedin class="h-5 w-5" />
										</Button>
									</a>
								</div>
								<p class="text-foreground text-opacity-40 text-sm">UTC-08:00 - Australia</p>
							</div>
						</div>
						<div class="text-lg">{profile.description}</div>
						<div class="flex items-center gap-4 flex-wrap">
							{#each allAvailabilities as availability}
								{#if profile.availabilities.includes(availability)}
									<div class="flex gap-2 items-center">
										{availability}
										<CheckIcon class="text-primary" />
									</div>
								{:else}
									<div class="flex gap-2 items-center opacity-30">
										{availability}
										<X class="h-5 w-5" />
									</div>
								{/if}
							{/each}
						</div>
						<Separator />
						<div class="flex justify-between items-center">
							<Button variant="outline" class="">Endorse 🫡</Button>
							<Button variant="ghost" class="gap-2">
								<span class="flex gap-1">
									<span class="text-opacity-40">
										{profile.endorsement_num}
									</span>
									<span>🫡</span>
								</span>
								<span class="flex -space-x-2">
									<Avatar class="h-8 w-8 border-2 border-background">
										<AvatarImage
											src="https://i.kym-cdn.com/photos/images/original/002/307/265/9a6"
										/>
									</Avatar>
									<Avatar class="h-8 w-8 border-2 border-background">
										<AvatarImage src="https://i.redd.it/l0m6jy5zqwxa1.png" />
									</Avatar>
									<Avatar class="h-8 w-8 border-2 border-background">
										<AvatarImage
											src="https://media.tenor.com/Mfk5cU9Jdg8AAAAe/chad-face-chad.png"
										/>
									</Avatar>
								</span>
								<span>
									<DotsThree class="w-5 h-5 opacity-30" />
								</span>
							</Button>
						</div>
						{#each profile.projects as project}
							<div class="border rounded-xl p-4 space-y-4 text-sm">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2 flex-wrap">
										<h4>{project.name}</h4>
										<h6 class="text-foreground text-opacity-40">{project.url}</h6>
									</div>
									<div class="flex items-center gap-2">
										{#each supabaseTech as { Icon, name }}
											<Icon
												class={cn(
													'h-4 w-4 ml-2',
													project.usedTech.includes(name)
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
										{#if Boolean(project.github)}
											<a href={project.github} target="_blank">
												<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
													<GithubLogo class="h-5 w-5" />
												</Button>
											</a>
										{/if}
										<a href={project.link} target="_blank">
											<Button variant="ghost" size="icon" class="p-1 h-auto w-auto rounded-md">
												<Link2 class="h-5 w-5" />
											</Button>
										</a>
									</div>
								</div>
							</div>
						{/each}
						<div class="text-">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
