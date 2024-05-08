<script lang="ts">
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import Logo from './Logo.svelte';
	import SupabaseLogo from './SupabaseLogo.svelte';
	import Button from '$lib/components/shadcn/ui/button/button.svelte';
</script>

<footer class="">
	<div
		class="flex flex-col items-center justify-center gap-6 border-y border-neutral-800 px-4 py-20"
	>
		<Logo />
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-center text-2xl font-bold text-neutral-50">
				Discover & connect with folks who are building with
			</h1>
			<SupabaseLogo />
		</div>
		<Button variant="outline" class="border-emerald-400 text-emerald-400"
			>Submit your profile -></Button
		>
		<div class="flex items-center gap-6">
			<Button
				variant="outline"
				href="https://discord.gg/skunkworks"
				target="_blank"
				class="flex items-center gap-2"
				>Discord <iconify-icon icon="ic:baseline-discord"></iconify-icon></Button
			>
			<Button
				variant="outline"
				href="https://twitter.com/supabasedcom"
				target="_blank"
				class="flex items-center gap-2"
				>Twitter <iconify-icon icon="mdi:twitter"></iconify-icon></Button
			>
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-6 border-y border-neutral-800 px-4 py-20"
	>
		<p class="text-center text-neutral-600">
			Created by this gang of misfits for the <a
				href="https://supabase.com/blog/supabase-oss-hackathon"
				class="underline"
				target="_blank">Supabase GA OSS Hackathon</a
			>
		</p>
		<ul class="flex flex-wrap items-center justify-center gap-4">
			<!-- TODO: Add our profile pictures -->
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/998?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1000?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1001?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1002?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1003?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1002?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar.Root class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<Avatar.Image src="https://avatars.githubusercontent.com/u/1003?v=4" alt="ting" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</li>
		</ul>
	</div>
	<div class="inline-flex w-full flex-col items-center justify-center gap-2 px-4 py-6 md:flex-row">
		<p class="text-center text-neutral-600">
			Made with &lt;3 live on Twitch using BasedKit: SvelteKit, ShadCN, Typescript &
		</p>
		<a href="https://supabase.com" target="_blank"><SupabaseLogo /></a>
	</div>
</footer>
