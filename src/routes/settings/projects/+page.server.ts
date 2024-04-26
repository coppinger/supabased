import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { projectSchema } from './schema'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import type { Tables } from '$lib/types/DatabaseDefinitions'
import { Octokit } from 'octokit'

const { randomUUID } = crypto

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase }, fetch, request }) => {
	const { session } = await safeGetSession()

	if (!session?.user.id) {
		throw redirect(303, '/login')
	}

	const { data, error: profilesError } = await supabase.from('profiles').select().eq('id', session.user.id).single<Tables<'profiles'>>()
	if (profilesError || !data.github_username) return error(400)

	const octokit = new Octokit({
		userAgent: request.headers.get('user-agent') ?? undefined,
		request: {
			fetch
		}
	})

	const { data: repos } = await octokit.rest.repos.listForUser({
		username: data.github_username
	})

	return {
		form: await superValidate(zod(projectSchema)),
		repos,
		projects: await supabase.from('projects').select().eq('profile_id', session.user.id).returns<Tables<'projects'>[]>()
	}
}

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession()

		if (!session) {
			throw redirect(303, '/login?redirectedFrom=onboarding')
		}

		const form = await superValidate(request, zod(projectSchema))

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form })
		}

		// TODO: Do something with the validated form.data
		// // const { error: errorProjectInsert, data: dataProjectInsert } = await supabase
		// // 	.from('projects')
		// // 	.insert({
		// // 		project_name: form.data.project_name,
		// // 		project_url: form.data.project_url,
		// // 		description: form.data.description,
		// // 		profile_id: session.user.id
		// // 	})
		// // 	.select()

		// if (errorProjectInsert) {
		// 	console.log(errorProjectInsert)

		// 	return error(500, 'Error updating or inserting project.')
		// }

		// console.log(dataProjectInsert)

		return message(form, 'Form posted successfully!')
	}
}
