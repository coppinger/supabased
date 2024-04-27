import type { PageServerLoad } from './$types'
import { profileSchema, VALIDATIONS, type ProfileSchema } from './schema'
import { message, setError, superValidate } from 'sveltekit-superforms'
import { redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import type { Tables } from '$lib/types/DatabaseDefinitions'

const { randomUUID } = crypto

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase }, request, fetch }) => {
	const { session } = await safeGetSession()

	if (!session?.user.id) {
		redirect(303, '/login')
	}

	return {
		form: await superValidate<ProfileSchema, string>(zod(profileSchema)),
		availabilities: await supabase.from('availabilities').select().order('sort').returns<Tables<'availabilities'>[]>(),
		products: await supabase.from('products').select().order('sort').returns<Tables<'products'>[]>(),
	}
}

export const actions = {
	profile: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession()
		if (!session) redirect(303, '/login')

		const form = await superValidate<ProfileSchema, string>(request, zod(profileSchema))

		if (!form.valid) return message(form, 'Invalid form', { status: 400 })

		const { pfp_url: file, display_name, bio, location, username, availability, products } = form.data
		const insertData: Partial<Tables<'profiles'>> = {}
		if (display_name) insertData.display_name = display_name
		if (location) insertData.location = location
		if (bio) insertData.bio = bio
		if (username) insertData.username = username

		const { data, error } = await supabase
			.from('profiles')
			.select('username')
			.eq('username', username)
			.maybeSingle()

		if (data) return setError(form, 'username', VALIDATIONS.USERNAME.FAIL)


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
			insertData.pfp_url = url.publicUrl
		}

		const { error: errorProfileInsert } = await supabase
			.from('profiles')
			.update(insertData)
			.eq('id', session.user.id)
			.select()

		if (errorProfileInsert) {
			console.log(errorProfileInsert)
			return message(form, 'Error updating or inserting profile.', { status: 400 })
		}

		if (availability.length) {
			const { data: currentRows, error: currentError } = await supabase.from('profiles_availabilities').select().returns<Tables<'profiles_availabilities'>[]>()
			if (currentError) return message(form, currentError.message, { status: 400 })

			const { data, error } = await supabase
				.from('profiles_availabilities')
				.upsert(availability.map(avail => ({
					profile_id: session.user.id,
					availability_id: avail,
					id: currentRows.find(row => row.availability_id === avail)?.id
				})), { ignoreDuplicates: true })
				.select()
			if (error) return message(form, error.message, { status: 400 })

			const rowsToDelete = currentRows.filter(row => !availability.includes(row.availability_id!)).map(row => row.id)
			const { data: deletedRows, error: deletedError } = await supabase.from('profiles_availabilities').delete().in('id', rowsToDelete).select()
		}
		else {
			const { data, error } = await supabase.from('profiles_availabilities').delete().eq('profile_id', session.user.id).select()
			if (error) return message(form, error.message, { status: 400 })
		}

		if (products.length) {
			const { data, error } = await supabase.from('profiles_products').upsert(products.map(product => ({ profile_id: session.user.id, product_id: product }))).select()
			if (error) return message(form, error.message, { status: 400 })
			console.log(data)
		}
		else {

			const { data, error } = await supabase.from('profiles_products').delete().eq('profile_id', session.user.id).select()
			if (error) return message(form, error.message, { status: 400 })
		}
		return message(form, ':)')
	}
}

