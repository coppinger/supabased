import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_DEV_URL,
	PUBLIC_SUPABASE_DEV_ANON
} from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { sequence } from '@sveltejs/kit/hooks'

const _URL = dev ? PUBLIC_SUPABASE_DEV_URL : PUBLIC_SUPABASE_URL
const _ANON = dev ? PUBLIC_SUPABASE_DEV_ANON : PUBLIC_SUPABASE_ANON_KEY

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(_URL, _ANON, {
		cookies: {
			get: (key) => event.cookies.get(key),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' })
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' })
			},
		},
	})

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()
		if (!session) {
			return { session: null, user: null }
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser()
		if (error) {
			// JWT validation has failed
			return { session: null, user: null }
		}

		return { session, user }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
	})
}

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession()
	event.locals.session = session
	event.locals.user = user

	if (!event.locals.session && event.url.pathname.startsWith('/settings')) {
		return redirect(303, '/')
	}

	return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID()

	console.log('Unexpect server error', error, status, message, event)

	return {
		message: 'Whoops!',
		errorId
	}
}
