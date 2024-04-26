import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { profileSchema, VALIDATIONS, type ProfileSchema } from './schema'
import { fail, message, setError, superValidate } from 'sveltekit-superforms'
import { redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'

const { randomUUID } = crypto

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession()

	if (!session?.user.id) {
		redirect(303, '/login')
	}

	return {
		form: await superValidate<ProfileSchema, string>(zod(profileSchema)),
	}
}

export const actions = {
	profile: async ({ request, locals: { supabase, safeGetSession } }) => {

		const { session } = await safeGetSession()
		if (!session) redirect(303, '/login')

		const form = await superValidate<ProfileSchema, string>(request, zod(profileSchema))

		if (!form.valid) return message(form, 'Invalid form', { status: 400 })

		const { pfp_url: file, display_name, bio, location, username } = form.data

		const { data, error } = await supabase
			.from('profiles')
			.select('username')
			.eq('username', username)
			.maybeSingle()

		if (data) return setError(form, 'username', VALIDATIONS.USERNAME.FAIL)

		let pfp_url = null
		if (file) {
			const fileExt = file.name.split('.').pop()
			const filePath = `${randomUUID()}.${fileExt}`

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from('profile_pictures')
				.upload(filePath, file)

			if (uploadError) return setError(form, 'pfp_url', 'Error uploading profile pic')

			const { data: url } = supabase.storage
				.from('profile_pictures')
				.getPublicUrl(uploadData.path, {
					transform: {
						width: 400,
						height: 400,
						resize: 'cover' // 'cover' | 'fill' | 'contain'
					}
				})

			if (!url) {
				return message(form, 'Issue with getting Public URL', { status: 500 })
			}

			pfp_url = url
		}
		const { error: errorProfileInsert } = await supabase
			.from('profiles')
			.update({
				display_name,
				location,
				bio,
				pfp_url,
				username
			})
			.eq('id', session.user.id)
			.select()

		if (errorProfileInsert) {
			console.log(errorProfileInsert)
			return message(form, 'Error updating or inserting profile.', { status: 400 })
		}

		return message(form, ':)')
	}
}
