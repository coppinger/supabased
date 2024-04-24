import type { SuperValidated } from 'sveltekit-superforms'
import type { Database } from '../DatabaseDefinitions'
import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { EndorseSchema } from '$routes/profile/[name]/schema'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
		}
		interface PageData {
			supabase: SupabaseClient<Database>
			session: Session | null
			user: User | null
			endorse: SuperValidated<Infer<EndorseSchema>>
		}
		// interface Error {}
		// interface Platform {}
	}
}
