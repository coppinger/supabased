import { dev } from '$app/environment'
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_DEV_ANON,
	PUBLIC_SUPABASE_DEV_URL
} from '$env/static/public'
import type { Database, Tables } from '$lib/types/DatabaseDefinitions'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

const _URL = false ? PUBLIC_SUPABASE_DEV_URL : PUBLIC_SUPABASE_URL
const _ANON = false ? PUBLIC_SUPABASE_DEV_ANON : PUBLIC_SUPABASE_ANON_KEY

export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth')

	const supabase = createBrowserClient<Database>(_URL, _ANON, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session)
				}

				const cookie = parse(document.cookie)
				return cookie[key]
			}
		}
	})

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession()

	return {
		supabase,
		session,
		user: {
			...session?.user,
			profile: supabase
				.from('profiles')
				.select()
				.eq('id', session?.user?.id ?? '')
				.maybeSingle<Tables<'profiles'>>()
		},
		endorse: data.endorse,
	}
}) satisfies LayoutLoad
