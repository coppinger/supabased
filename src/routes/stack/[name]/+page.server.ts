import { message, superValidate, type Infer } from "sveltekit-superforms"
import type { Actions, PageServerLoad } from "./$types"
import { formSchema, type FormSchema } from "./schema"
import { zod } from "sveltekit-superforms/adapters"

export interface Message {
    status: 'error' | 'success'
    text: string
}

export const load = (async ({ locals, params: { name } }) => {

    return {
        form: await superValidate(zod(formSchema))
    }

}) satisfies PageServerLoad

export const actions = {
    default: async ({ locals, request }) => {
        // User should be logged in before endorsing
        // const { user } = await locals.safeGetSession()
        const form = await superValidate<Infer<FormSchema>, Message>(request, zod(formSchema))

        // if (!form.valid) return message(form, { status: 'error', text: 'Invalid form' })

        // TODO remove, for testing only
        console.table(form.data)

        // if (!user) return message(form, { status: 'error', text: 'Please login to submit.' }, {
        //   status: 401
        // })

        // TODO add schema
        // await locals.supabase.from('stacks').insert({ id: form.data.stackname })

        return message(form, { status: 'success', text: `Recieved your submission to add ${form.data.stackname}` })
    }

} satisfies Actions