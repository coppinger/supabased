import type { Database, Tables } from '$lib/types/DatabaseDefinitions'
import type { Require } from '$lib/components/shadcn/utils'
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
export async function deleteUserProjectByRepoUrl(supabase: SupabaseClient<Database>, url: Tables<'projects'>['repository_url'] | Tables<'projects'>['repository_url'][]) {
    return supabase.from('projects').delete().in('repository_url', Array.isArray(url) ? url : [url]).select()
}

type UserProject = Require<Partial<Tables<'projects'>>, 'profile_id'> & { stacks?: string[], products?: string[] }
export async function insertUserProject(supabase: SupabaseClient<Database>, project: UserProject | UserProject[]) {
    const projects = Array.isArray(project) ? project : [project]

    const { data: found } = await supabase.from('projects').select().in('repository_url', projects.map(project => project.repository_url))
    if (found) {
        for (const project of projects) {
            const idx = found.findIndex(row => row.repository_url === project.repository_url)
            console.log(project.id, idx)
            if (idx !== -1) continue
            project.id = crypto.randomUUID()
        }
    }

    const stacks = projects.map(project => ({ project_id: project.id, stacks: project.stacks })).filter(project => project.project_id && project.stacks)
    const products = projects.map(project => ({ project_id: project.id, products: project.products })).filter(project => project.products && project.project_id)

    const { data, error } = await supabase.from('projects').upsert(projects.map(project => {
        const { stacks, products, ...rest } = project
        return rest
    })).select()

    if (error) {
        console.log('insert project error', error)
        return { data, error }
    }

    for (const stack of stacks) {
        if (!stack.project_id || !stack.stacks) continue

        await supabase.from('projects_stacks').delete().eq('project_id', stack.project_id)
        const { data: stacks } = await supabase.from('stacks').select().in('name', stack.stacks)

        const mapped_stacks = stack.stacks.map(s => ({
            project_id: stack.project_id,
            stack_id: stacks?.find(ele => ele.name === s)?.id
        })).filter(ele => ele.stack_id)

        await supabase.from('projects_stacks').insert(mapped_stacks)
    }

    for (const product of products) {
        if (!product.project_id || !product.products) continue
        await supabase.from('projects_products').delete().eq('project_id', product.project_id).select()

        const { data: products } = await supabase.from('products').select().in('name', product.products)
        const mapped_products = product.products.map(p => ({
            project_id: product.project_id,
            product_id: products?.find(ele => ele.name === p)?.id
        })).filter(ele => ele.product_id)

        await supabase.from('projects_products').insert(mapped_products)

    }

    for (const project of projects) {
        if (!project.repository_url || !project.id) continue

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

        if (!data) continue

        await supabase.from('projects_languages').delete().eq('project_id', project.id)
        const { error } = await insertUserProjectLanguages(supabase, ids.map(id => ({ project_id: data[0].id, language_id: id })))
        if (error) console.log(error)
    }

    return { data, error }
}


export async function insertUserProjectLanguages(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_languages'>, 'id'> | Omit<Tables<'projects_languages'>, 'id'>[]) {
    const _row = Array.isArray(row) ? row : [row]
    return supabase.from('projects_languages').insert(_row).select()
}

export async function insertUserProjectStacks(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_stacks'>, 'id'> | Omit<Tables<'projects_stacks'>, 'id'>[]) {
    return supabase.from('projects_stacks').insert(Array.isArray(row) ? row : [row]).select()
}

export async function insertUserProjectProducts(supabase: SupabaseClient<Database>, row: Omit<Tables<'projects_products'>, 'id'> | Omit<Tables<'projects_products'>, 'id'>[]) {
    return supabase.from('projects_products').insert(Array.isArray(row) ? row : [row]).select()
}