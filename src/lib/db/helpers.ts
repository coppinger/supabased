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

type UserProject = Require<Partial<Tables<'projects'>>, 'profile_id'> & { stacks: [], products: [] }
export async function insertUserProject(supabase: SupabaseClient<Database>, project: UserProject | UserProject[]) {

    const _project = Array.isArray(project) ? project : [project]
    const projects = _project.map((p) => ({ ...p, id: crypto.randomUUID() }))

    const mapped_projects = projects.map(project => {
        const { stacks, products, ...rest } = project
        return rest
    })

    const { data, error } = await supabase.from('projects').insert(mapped_projects).select()
    if (error) {
        console.log('insert project error', error)
        return { data, error }
    }

    for (const project of projects) {
        if (project.stacks) {
            const { data: stacks } = await supabase.from('stacks').select().in('name', project.stacks)

            const mapped_stacks = project.stacks.map(stack => ({
                project_id: project.id,
                stack_id: stacks?.find(ele => ele.name === stack)?.id
            })).filter(ele => ele.stack_id)

            await supabase.from('projects_stacks').insert(mapped_stacks)

        }
        if (project.products) {
            const { data: products } = await supabase.from('products').select().in('name', project.products)
            const mapped_products = project.products.map(product => ({
                project_id: project.id,
                product_id: products?.find(ele => ele.name === product)?.id
            })).filter(ele => ele.product_id)

            await supabase.from('projects_products').insert(mapped_products)
        }

        if (project.repository_url) {
            const [owner, repo] = project.repository_url.split('/').splice(3)

            const { data: languages } = await octokit.rest.repos.listLanguages({
                owner,
                repo
            })

            let ids = []
            for (const language of Object.keys(languages)) {
                const { data: returnedLanguage, error: returnedLanguageError } = await supabase.from('languages').select().eq('name', language).maybeSingle()
                if (returnedLanguage) ids.push(returnedLanguage.id)

            }
            if (data) {
                const { error } = await insertUserProjectLanguages(supabase, ids.map(id => ({ project_id: data[0].id, language_id: id })))
                if (error) console.log(error)
            }

        }

    }
    return { data, error }
}


export async function insertUserProjectLanguages(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_languages'>, 'id'> | Omit<Tables<'projects_languages'>, 'id'>[]) {
    return supabase.from('projects_languages').insert(Array.isArray(row) ? row : [row]).select()
}

export async function insertUserProjectStacks(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_stacks'>, 'id'> | Omit<Tables<'projects_stacks'>, 'id'>[]) {
    return supabase.from('projects_stacks').insert(Array.isArray(row) ? row : [row]).select()
}

export async function insertUserProjectProducts(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_products'>, 'id'> | Omit<Tables<'projects_products'>, 'id'>[]) {
    return supabase.from('projects_products').insert(Array.isArray(row) ? row : [row]).select()
}