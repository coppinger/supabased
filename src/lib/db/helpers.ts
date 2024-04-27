import type { Database, Tables } from '$lib/types/DatabaseDefinitions'
import type { Require } from '$lib/utils'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { Octokit } from 'octokit'

const octokit = new Octokit()

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
    return supabase.from('projects').delete().in('id', Array.isArray(id) ? id : [id]).select()
}

export async function insertUserProject(supabase: SupabaseClient<Database>, project: Require<Partial<Tables<'projects'>>, 'profile_id'> | Require<Partial<Tables<'projects'>>, 'profile_id'>[]) {
    const _project = Array.isArray(project) ? project : [project]
    const projects = _project.map((p) => {
        const { id: _, ...rest } = p
        return rest
    })
    const { data, ...rest } = await supabase.from('projects').insert(projects).select()
    for (const project of projects) {
        if (!project.repository_url) continue
        const [owner, repo] = project.repository_url.split('/').splice(3)
        const { data: languages } = await octokit.rest.repos.listLanguages({
            owner,
            repo
        })


        let ids = []
        for (const language of Object.keys(languages)) {
            const { data: returnedLanguage, error: returnedLanguageError } = await supabase.from('languages').select().eq('name', language).maybeSingle()
            if (!returnedLanguage) {
                console.log(language)
                // const { data: returnedLanguage, error } = await supabase.from('languages').insert({ name: language }).select().maybeSingle()
                // if (!returnedLanguage) {
                //     console.log(error)
                //     continue
                // }
                // ids.push(returnedLanguage.id)
            } else ids.push(returnedLanguage.id)

        }
        if (data) {
            const { error } = await insertUserProjectLanguages(supabase, ids.map(id => ({ project_id: data[0].id, language_id: id })))
            if (error) console.log(error)
        }

    }
    return { data, ...rest }
}


export async function insertUserProjectLanguages(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_languages'>, 'id'> | Omit<Tables<'projects_languages'>, 'id'>[]) {
    return supabase.from('projects_languages').insert(Array.isArray(row) ? row : [row]).select()
}