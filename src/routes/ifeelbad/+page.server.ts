import type { Tables } from '$lib/types/DatabaseDefinitions.js'

export async function load({ locals: { supabase } }) {
	// const { data } = await supabase.from('table').select();

	//FIXME DELETEME when we have actual profile data
	// const profiles = await supabase.from('profiles').select(`
	//     *,
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
	//     ),
	//   `);


	return {
		profiles: await supabase
			.from('profiles')
			.select('*')
			.returns<Tables<'profiles'>[]>(),
		availabilityTypes: supabase.from('availability_types').select().order('sort').returns<Tables<'availability_types'>[]>(),
		products: supabase.from('supabase_products').select().order('sort').returns<Tables<'supabase_products'>[]>(),
		stacks: supabase.from('stacks').select('name').limit(10).returns<Tables<'stacks'>[]>(),
	}
}
