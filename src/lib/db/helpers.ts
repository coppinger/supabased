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
 * const { data, error } = await insertUserAvailability(supabase, user, id);
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
export async function insertUserAvailability(supabase: SupabaseClient<Database>, user: User, availability_id: Tables<'availabilities'>['id']) {
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
 * const { data, error } = await deleteUserAvailability(supabase, id);
 * 
 * // you can then use this with a toast.
 * if(error) toast.error('Error removing availability');
 * if(data) toast.success('Removed availability');
 * ```
 * @param supabase SupabaseClient<Database>
 * @param id string
 * @returns 
 */
export async function deleteUserAvailability(supabase: SupabaseClient<Database>, id: number | number[]) {
    return supabase.from('profiles_availabilities').delete().in('availability_id', Array.isArray(id) ? id : [id]).select()
}

export async function deleteUserProject(supabase: SupabaseClient<Database>, id: Tables<'projects'>['id'] | Tables<'projects'>['id'][]) {
    return supabase.from('projects').delete().in('id', Array.isArray(id) ? id : [id]).select().maybeSingle()
}

export async function insertUserProject(supabase: SupabaseClient<Database>, project: Tables<'projects'> | Tables<'projects'>[]) {
    if (Array.isArray(project)) {
        const projects = project.map((p) => {
            const { id: _, ...rest } = p
            return rest
        })
        return supabase.from('projects').insert(projects).select().maybeSingle()
    } else {
        const { id: _, ...rest } = project
        return supabase.from('projects').insert(rest).select().maybeSingle()
    }
}
