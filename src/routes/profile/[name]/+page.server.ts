import { message, superValidate, type Infer } from "sveltekit-superforms"
import type { Actions, PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { endorseSchema, type EndorseSchema } from "./schema"
import type { User } from "@supabase/supabase-js"
import type { Tables } from "$lib/types/DatabaseDefinitions"

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
    // supabase
    // like: await superValidate(zod(likeSchema))
  }

}) satisfies PageServerLoad

export const actions = {
  like: async ({ locals, params: { name } }) => {
    // return message()
  },
  endorse: async ({ request, locals: { safeGetSession, supabase }, params: { name } }) => {
    const { user }: { user: User | null } = await safeGetSession()
    const form = await superValidate<Infer<EndorseSchema>, Message>(request, zod(endorseSchema))

    if (!form.valid) return message(form, { status: 'error', text: 'Invalid form' })

    if (!user?.id) return message(form, { status: 'error', text: 'Please Login to Endorse.' }, {
      status: 401
    })

    const { data, error: dbError } = await supabase.from('endorsements').select()
      .eq('endorsed_by', user.id)
      .eq('endorsement_to', form.data.profile)
      .maybeSingle<Tables<'endorsements'>>()

    if (dbError) {
      console.log(dbError)
      return message(form, { status: 'error', text: '' })
    }

    if (data) {
      console.log(data)
      const { data: deletedData, error: deletedError } = await supabase.from('endorsements').delete().eq('id', data.id).select().single()
      console.log(deletedData, deletedError)
      return message(form, { status: 'success', text: `Your endorsement to ${name} was removed` })
    }

    const { error } = await supabase.from('endorsements').insert({ endorsed_by: user.id, endorsement_to: form.data.profile })

    if (error) {
      console.log(error)
      return message(form, { status: 'error', text: `${name} couldn't receive your endorsement. :(` })
    }

    return message(form, { status: 'success', text: `${name} received your endorsement` })
  }
} satisfies Actions
