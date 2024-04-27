import { PROFILE_QUERY, type ProfilesResult } from '$lib/db/query'
import type { Tables } from '$lib/types/DatabaseDefinitions'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { endorseSchema } from './profile/[name]/schema'

export async function load({ locals: { supabase } }) {

	return {
		profiles: await supabase
			.from('profiles')
			.select(PROFILE_QUERY)
			.neq('display_name', null)
			.returns<ProfilesResult[]>(),
		availabilities: await supabase.from('availabilities').select().order('sort').returns<Tables<'availabilities'>[]>(),
		products: await supabase.from('products').select().order('sort').returns<Tables<'products'>[]>(),
		stacks: await supabase.from('stacks_count').select().limit(6).returns<Tables<'stacks_count'>[]>(),
		endorse: await superValidate(zod(endorseSchema))
	}
}
