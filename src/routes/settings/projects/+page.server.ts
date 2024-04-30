import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { projectSchema } from './schema'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import type { Tables } from '$lib/types/DatabaseDefinitions'
import { Octokit } from 'octokit'
import { insertUserProject } from '$lib/db/helpers'

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
		projects: await supabase.from('projects').select().eq('profile_id', session.user.id).returns<Tables<'projects'>[]>(),
		products: await supabase.from('products').select().order('sort').returns<Tables<'products'>[]>(),
	}
}

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession()

		if (!session?.user.id) {
			throw redirect(303, '/login')
		}

		const form = await superValidate(request, zod(projectSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		const { project_name, project_url, repository_url, description, stacks, products } = form.data

		const { error } = await insertUserProject(supabase, {
			profile_id: session.user.id,
			project_name,
			project_url,
			description,
			repository_url,
			stacks,
			products
		})

		if (error) {
			console.log(error)
			return fail(500, { form })
		}

		return message(form, 'Form posted successfully!')
	}
}
