import { profiles as mockProfiles } from '$lib/components/profile/mock.js';

export async function load({ locals: { supabase } }) {
	//FIXME DELETEME when we have actual profile data
	const profiles = mockProfiles;

	return {
		profiles
	};
}
