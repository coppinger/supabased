import { message, superValidate, type Infer } from "sveltekit-superforms"
import type { Actions, PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { endorseSchema, type EndorseSchema } from "./schema"
import type { User } from "@supabase/supabase-js"

export interface Message {
  status: 'error' | 'success'
  text: string
  // TODO add correct type
}

export const load = (async ({ locals: { supabase, safeGetSession }, params: { name } }) => {
  // TODO add constraints
  // const profile = locals.supabase.from('profiles').select()

  // FIXME test data
  const profile = {
    name
  }

  return {
    profile,
    supabase
    // like: await superValidate(zod(likeSchema))
  }

}) satisfies PageServerLoad

export const actions = {
  like: async ({ locals, params: { name } }) => {
    // return message()
  },
  endorse: async ({ request, locals, params: { name } }) => {
    const { user }: { user: User | null } = await locals.safeGetSession()
    const form = await superValidate<Infer<EndorseSchema>, Message>(request, zod(endorseSchema))

    if (!form.valid) return message(form, { status: 'error', text: 'Invalid form' })

    if (!user?.id) return message(form, { status: 'error', text: 'Please Login to Endorse.' }, {
      status: 401
    })

    // TODO add constraints
    // WARN don't return the full profile, just the name (or whatever else we need) for context
    // const returned = await locals.supabase.from('profiles').update('').select('name').single()

    return message(form, { status: 'success', text: `${name} received your endorsement` })
  }
} satisfies Actions
