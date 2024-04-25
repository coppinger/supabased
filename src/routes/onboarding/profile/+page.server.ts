import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { profileSchema } from './schema'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'

const { randomUUID } = crypto

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session } = await safeGetSession()

	if (!session?.user.id) {
		throw redirect(303, '/login?redirectedFrom=onboarding')
	}

	return {
		form: await superValidate(zod(profileSchema)),
	}
}

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession()

		if (!session) {
			throw redirect(303, '/login?redirectedFrom=onboarding')
		}

		const form = await superValidate(request, zod(profileSchema))

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form })
		}
		const { pfp_url: file, display_name, bio, location, username } = form.data

		let publicUrl
		if (file) {
			const fileExt = file.name.split('.').pop()
			const filePath = `${randomUUID()}.${fileExt}`

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from('profile_pictures')
				.upload(filePath, file)

			if (uploadError) {
				return error(500, 'Error uploading file.')
			}
			const { data: publicUrlData } = supabase.storage
				.from('profile_pictures')
				.getPublicUrl(uploadData.path, {
					transform: {
						width: 400,
						height: 400,
						resize: 'cover' // 'cover' | 'fill' | 'contain'
					}
				})

			if (!publicUrlData) {
				return error(500, 'Error retrieving public URL.')
			}
			publicUrl = publicUrlData

		}

		const { error: errorProfileInsert } = await supabase
			.from('profiles')
			.update({
				display_name,
				location,
				bio,
				pfp_url: publicUrl ?? null,
				username
			})
			.eq('id', session.user.id)
			.select()

		if (errorProfileInsert) {
			console.log(errorProfileInsert)
			return error(500, 'Error updating or inserting profile.')
		}

		return message(form, 'Form posted successfully!')
	}
}
