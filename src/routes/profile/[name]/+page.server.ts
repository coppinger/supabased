import { message, superValidate, type Infer } from "sveltekit-superforms"
import type { Actions, PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { endorseSchema, type EndorseSchema } from "./schema"

export interface Message {
  status: 'error' | 'success'
  text: string
  // TODO add correct type
  profile?: {
    name: any
  } | null
}

export const load = (async ({ locals, params: { name } }) => {
  // TODO add constraints
  // const profile = locals.supabase.from('profiles').select()

  console.log(name)
  // FIXME test data
  const profile = {
    name
  }

  return {
    profile,
    // like: await superValidate(zod(likeSchema))
  }

}) satisfies PageServerLoad

export const actions = {
  like: async ({ locals, params: { name } }) => {
    // return message()
  },
  endorse: async ({ request, locals, params: { name } }) => {
    // const { user } = await locals.safeGetSession()
    const form = await superValidate<Infer<EndorseSchema>, Message>(request, zod(endorseSchema))

    if (!form.valid) return message(form, { status: 'error', text: 'Invalid form' })

    // if (!user) return message(form, { status: 'error', text: 'Please Login to Endorse.' }, {
    //   status: 401
    // })

    // TODO add constraints
    // WARN don't return the full profile, just the name (or whatever else we need) for context
    // const returned = await locals.supabase.from('profiles').update('').select('name').single()

    // return message(form, { status: 'error', text: 'Endorsed', profile: returned.data })

    return message(form, { status: 'error', text: 'Endorsed', profile: { name: form.data.profile } })
  }
} satisfies Actions
