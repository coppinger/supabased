import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { profileSchema } from './profileSchema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

// import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';

// import type { Database } from '../../../../types/databaseDefinitions'

// 1. Handle errors more gracefully

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session } = await safeGetSession();
	console.log(session);

	if (!session) {
		throw redirect(303, '/login?redirectedFrom=onboarding');
	}
	const { data: profile } = await supabase
		.from('profiles')
		.select(`display_name, website, profile, pfp_url`)
		.eq('id', session.user.id)
		.single();
	return {
		form: await superValidate(zod(profileSchema)),
		profile,
		session
	};
};

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();

		if (!session) {
			throw redirect(303, '/login?redirectedFrom=onboarding');
		}

		const form = await superValidate(request, zod(profileSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		const file = form.data.pfp_url;
		const fileExt = file.name.split('.').pop();
		const filePath = `${randomUUID()}.${fileExt}`;

		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('profile_pictures')
			.upload(filePath, file);

		if (uploadError) {
			return error(500, 'Error uploading file.');
		}

		const { data: publicUrlData } = await supabase.storage
			.from('profile_pictures')
			.getPublicUrl(uploadData.path, {
				transform: {
					width: 400,
					height: 400,
					resize: 'cover' // 'cover' | 'fill' | 'contain'
				}
			});

		if (!publicUrlData) {
			return error(500, 'Error retrieving public URL.');
		}

		const { publicUrl } = publicUrlData;

		// TODO: Do something with the validated form.data
		const { error: errorProfileInsert } = await supabase
			.from('profiles')
			.update({
				display_name: form.data.display_name,
				location: form.data.location,
				bio: form.data.bio,
				pfp_url: publicUrl
			})
			.eq('id', session.user.id)
			.select();

		if (errorProfileInsert) {
			console.log(errorProfileInsert);
			return error(500, 'Error updating or inserting profile.');
		}

		return message(form, 'Form posted successfully!');
	}
};
