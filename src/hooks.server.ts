import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_DEV_URL,
	PUBLIC_SUPABASE_DEV_ANON
} from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '$lib/types/DatabaseDefinitions'
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
import { dev } from '$app/environment'

const _URL = dev ? PUBLIC_SUPABASE_DEV_URL : PUBLIC_SUPABASE_URL
const _ANON = dev ? PUBLIC_SUPABASE_DEV_ANON : PUBLIC_SUPABASE_ANON_KEY

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, url, cookies } = event

	locals.supabase = createServerClient<Database>(_URL, _ANON, {
		cookies: {
			get: (key) => cookies.get(key),
			/**
			 * Note: You have to add the `path` variable to the
			 * set and remove method due to sveltekit's cookie API
			 * requiring this to be set, setting the path to an empty string
			 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
			 */
			set: (key, value, options) => {
				cookies.set(key, value, { ...options, path: '/' })
			},
			remove: (key, options) => {
				cookies.delete(key, { ...options, path: '/' })
			}
		}
	})

	/**
	 * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
	 * doesn't validate the JWT, this function validates the JWT by first calling
	 * `getUser` and aborts early if the JWT signature is invalid.
	 */
	locals.safeGetSession = async () => {
		const {
			data: { user },
			error
		} = await locals.supabase.auth.getUser()

		if (error) {
			return { session: null, user: null }
		}

		const {
			data: { session }
		} = await locals.supabase.auth.getSession()
		return { session, user }
	}

	const { session } = await locals.safeGetSession()

	if (url.pathname.startsWith('/settings') && !session?.user.id) redirect(303, '/login')

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID()

	console.log('Unexpect server error', error, status, message, event)

	return {
		message: 'Whoops!',
		errorId
	}
}
