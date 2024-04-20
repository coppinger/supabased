// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    // if the user is already logged in return them to home page
    if (session) {
        throw redirect(303, '/')
    }

    return { url: url.origin }
}) satisfies PageServerLoad
