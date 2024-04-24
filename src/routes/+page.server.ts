import { PROFILE_QUERY, type ProfilesResult } from '$lib/db/query'
import type { Tables } from '$lib/types/DatabaseDefinitions'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { endorseSchema } from './profile/[name]/schema'

export async function load({ locals: { supabase } }) {

	const { data } = await supabase.from('projects_stacks').select('stack:stacks(name)')
	console.log(data)
	return {
		profiles: await supabase
			.from('profiles')
			.select(PROFILE_QUERY)
			.neq('display_name', null)
			.returns<ProfilesResult[]>(),
		availabilityTypes: supabase.from('availability_types').select().order('sort').returns<Tables<'availability_types'>[]>(),
		products: supabase.from('supabase_products').select().order('sort').returns<Tables<'supabase_products'>[]>(),
		stacks: supabase.from('stacks_count').select().limit(10).returns<Tables<'stacks_count'>[]>(),
		endorse: await superValidate(zod(endorseSchema))
	}
}
