<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';

	import Logo from './Logo.svelte';
	import SupabaseLogo from './SupabaseLogo.svelte';
	import Button from './ui/button/button.svelte';
</script>

<footer class="">
	<div
		class="flex flex-col gap-6 px-4 py-20 border-y border-neutral-800 items-center justify-center"
	>
		<Logo />
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-2xl font-bold text-center">
				Discover & connect with folks who are building with
			</h1>
			<SupabaseLogo />
		</div>
		<Button variant="outline" class="text-emerald-400 border-emerald-400"
			>Submit your profile -></Button
		>
		<div class="flex gap-6 items-center">
			<Button
				variant="outline"
				href="https://discord.gg/skunkworks"
				target="_blank"
				class="flex gap-2 items-center"
				>Discord <iconify-icon icon="ic:baseline-discord"></iconify-icon></Button
			>
			<Button
				variant="outline"
				href="https://twitter.com/supabasedcom"
				target="_blank"
				class="flex gap-2 items-center"
				>@supabasedcom <iconify-icon icon="mdi:twitter"></iconify-icon></Button
			>
		</div>
	</div>
	<div
		class="flex flex-col gap-6 px-4 py-20 border-y border-neutral-800 items-center justify-center"
	>
		<p class="text-neutral-600 text-center">
			Created by this gang of misfits for the <a
				href="https://supabase.com/blog/supabase-oss-hackathon"
				class="underline"
				target="_blank">Supabase GA OSS Hackathon</a
			>
		</p>
		<ul class="flex gap-4 flex-wrap justify-center items-center">
			<!-- TODO: Add our profile pictures -->
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/998?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1000?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1001?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1002?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1003?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1002?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
			<li>
				<a href="#" target="_blank">
					<Avatar class="h-12 w-12">
						<!-- <AvatarImage src={profile.profile_pic} alt={profile.firstName} /> -->
						<AvatarImage src="https://avatars.githubusercontent.com/u/1003?v=4" alt="ting" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</a>
			</li>
		</ul>
	</div>
	<div class="px-4 py-6 inline-flex flex-col gap-2 items-center">
		<p class="text-neutral-500 text-center">
			Made with &lt;3 live on Twitch using BasedKit: SvelteKit, ShadCN, Typescript &
		</p>
		<SupabaseLogo />
	</div>
</footer>
