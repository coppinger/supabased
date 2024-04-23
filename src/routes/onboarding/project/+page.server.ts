import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { projectSchema } from './projectSchema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import { randomUUID } from 'crypto';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const session = await safeGetSession();

	if (!session) {
		throw redirect(303, '/login?redirectedFrom=onboarding');
	}

	return {
		form: await superValidate(zod(projectSchema)),
		session
	};
};

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();

		if (!session) {
			throw redirect(303, '/login?redirectedFrom=onboarding');
		}

		const form = await superValidate(request, zod(projectSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		console.log(form.data);

		// TODO: Do something with the validated form.data
		const { error: errorProjectInsert, data: dataProjectInsert } = await supabase
			.from('projects')
			.insert({
				project_name: form.data.project_name,
				project_url: form.data.project_url,
				description: form.data.description,
				profile_id: session.user.id
			})
			.select();

		if (errorProjectInsert) {
			console.log(errorProjectInsert);

			return error(500, 'Error updating or inserting project.');
		}

		console.log(dataProjectInsert);

		return message(form, 'Form posted successfully!');
	}
};
