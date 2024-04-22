import { profiles as mockProfiles } from '$lib/components/profile/mock.js';

export async function load({ locals: { supabase } }) {
	// const { data, error } = await supabase.from('profiles').select(`
	//     *,
	//     endorsements(
	//       *,
	//       endorsed_by_profiles: profiles!endorsements_endorsed_by_fkey (id, display_name),
	//       endoresement_to_profiles: profiles!endorsements_endoresement_to_fkey (id, display_name)
	//     ),
	//     profile_availability_types(
	//       *,
	//       availability_types (id, name)
	//     ),
	//     profiles_roles(
	//       *,
	//       roles (id, name)
	//     ),
	//     projects(
	//       *,
	//       projects_stacks(stack_id)
	//     )
	//   `);

	//FIXME DELETEME when we have actual profile data
	const profiles = mockProfiles;

	return {
		profiles
	};
}
