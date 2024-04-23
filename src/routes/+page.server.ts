import { PROFILE_QUERY, type ProfilesResult } from '$lib/db/query'
import type { Tables } from '$lib/types/DatabaseDefinitions'

export async function load({ locals: { supabase } }) {
	return {
		profiles: await supabase
			.from('profiles')
			.select(PROFILE_QUERY)
			.returns<ProfilesResult[]>(),
		availabilityTypes: supabase.from('availability_types').select().order('sort').returns<Tables<'availability_types'>[]>(),
		products: supabase.from('supabase_products').select().order('sort').returns<Tables<'supabase_products'>[]>(),
		stacks: supabase.from('stacks').select('name').limit(10).returns<Tables<'stacks'>[]>(),
	}
}
