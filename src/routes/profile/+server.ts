import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	const { session } = await locals.safeGetSession();

	if (!session?.user) {
		redirect(303, '/login');
	} else {
		// TODO: Make sure this isn't fucked future Charlie!
		redirect(303, `/profile/${session?.user.username}`);
	}
};
