import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { Database } from '$lib/types/DatabaseDefinitions'
import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth')

	const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
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
	let {
		data: { session }
	} = await supabase.auth.getSession()

	// TODO maybe look into what events we can hook into
	supabase.auth.onAuthStateChange((event) => {
		// if (event === 'SIGNED_OUT')
	})


	return {
		supabase,
		session,
		user: session?.user,
		endorse: data.endorse
	}
}) satisfies LayoutLoad
