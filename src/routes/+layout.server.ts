// src/routes/+layout.server.ts
import { superValidate } from 'sveltekit-superforms'
import type { LayoutServerLoad } from './$types'
import { zod } from 'sveltekit-superforms/adapters'
import { endorseSchema } from './profile/[name]/schema'

export const load = (async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession()

  return {
    session,
    user,
    endorse: await superValidate(zod(endorseSchema)),
  }
}) satisfies LayoutServerLoad

