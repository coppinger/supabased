import type { Database, Tables } from '$lib/types/DatabaseDefinitions'
import type { SupabaseClient, User } from '@supabase/supabase-js'

/**
 * Add an availability to the user's Profile.
 * Returns the inserted row.
 * 
 * @example
 * ```ts
 * const { id } = availability;
 * 
 * const { data, error } = await addAvailabilityFromProfile(supabase, user, id);
 * 
 * // you can then use this with a toast.
 * if(error) toast.error('Error removing availability');
 * if(data) toast.success('Removed availability');
 * ```
 * @param supabase SupabaseClient<Database>
 * @param user User
 * @param availability_id Tables<'availabilities'>['id']
 * @returns 
 */
async function addAvailabilityFromProfile(supabase: SupabaseClient<Database>, user: User, availability_id: Tables<'availabilities'>['id']) {
    return await supabase.from('profiles_availabilities').insert({ profile_id: user.id, availability_id }).select()
}

/**
 * Remove an availability from the user's Profile.
 * Returns the removed row. 
 * 
 * @example
 * ```ts
 * const { id } = availability;
 * 
 * const { data, error } = await removeAvailabilityFromProfile(supabase, user, id);
 * 
 * // you can then use this with a toast.
 * if(error) toast.error('Error removing availability');
 * if(data) toast.success('Removed availability');
 * ```
 * @param supabase SupabaseClient<Database>
 * @param user User
 * @param availability_id string
 * @returns 
 */
async function removeAvailabilityFromProfile(supabase: SupabaseClient<Database>, user: User, availability_id: number) {
    return supabase.from('profiles_availabilities').delete().eq('profile_id', user.id).eq('availability_id', availability_id).select()
}

async function name(params: type) {

}