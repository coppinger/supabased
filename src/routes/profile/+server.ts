import type { Tables } from '$lib/types/DatabaseDefinitions.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	const { session } = await locals.safeGetSession();

	if (!session?.user) {
		redirect(303, '/login');
	} else {
		// TODO: Make sure this isn't fucked future Charlie!

		const { data, error: queryError } = await locals.supabase
			.from('profiles')
			.select(`username`)
			.eq('id', session.user.id)
			.single<Tables<'profiles'>>();

		if (queryError) {
			error(500, 'Error fetching username');
		}

		console.log(data);

		redirect(303, `/profiles/${data.username}`);
	}
};
