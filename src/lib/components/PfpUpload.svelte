<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string;
	export let supabase: SupabaseClient;

	let pfpUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('profile_pictures').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			pfpUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			const { error } = await supabase.storage.from('profile_pictures').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="">
	{#if pfpUrl}
		<img
			src={pfpUrl}
			alt={pfpUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>

<style>
	/* Widgets */

	.card {
		width: 100%;
		display: block;
		border: var(--custom-border);
		border-radius: var(--custom-border-radius);
		padding: var(--custom-spacing);
	}

	.avatar {
		border-radius: var(--custom-border-radius);
		overflow: hidden;
		max-width: 100%;
	}
	.avatar.image {
		object-fit: cover;
	}
	.avatar.no-image {
		background-color: #333;
		border: 1px solid rgb(200, 200, 200);
		border-radius: 5px;
	}

	.footer {
		position: absolute;
		max-width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-flow: row;
		border-top: var(--custom-border);
		background-color: var(--custom-bg-color);
	}
	.footer div {
		padding: var(--custom-spacing);
		display: flex;
		align-items: center;
		width: 100%;
	}
	.footer div > img {
		height: 20px;
		margin-left: 10px;
	}
	.footer > div:first-child {
		display: none;
	}
	.footer > div:nth-child(2) {
		justify-content: left;
	}

	@media only screen and (min-width: 60em) {
		/* 960px */
		.footer > div:first-child {
			display: flex;
		}
		.footer > div:nth-child(2) {
			justify-content: center;
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.mainHeader {
		width: 100%;
		font-size: 1.3rem;
		margin-bottom: 20px;
	}

	.avatarPlaceholder {
		border: var(--custom-border);
		border-radius: var(--custom-border-radius);
		width: 35px;
		height: 35px;
		background-color: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-widget {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-widget > .button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: #444444;
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	.form-widget .button:hover {
		background-color: #2a2a2a;
	}

	.form-widget .button > .loader {
		width: 17px;
		animation: spin 1s linear infinite;
		filter: invert(1);
	}
</style>
