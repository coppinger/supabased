import type { Tables } from '$lib/types/DatabaseDefinitions'

export const PROFILE_QUERY = `*, 
availabilities:profile_availability_types!inner(availability:availability_types!inner(name)), 
roles:profiles_roles(role:roles!inner(name)), 
projects!inner(*,stacks:projects_stacks!inner(stack:stacks!inner(name)), products:supabase_products_projects!inner(product:supabase_products!inner(name))), 
endorsements!endorsements_endorsement_to_fkey(*, profiles!endorsements_endorsed_by_fkey(*))` as const

export interface ProfilesResult extends Tables<'profiles'> {
    roles: RolesResult[]
    projects: ProjectsResult[]
    availabilities: AvailabilitiesResult[]
    endorsements: EndorsementsResult[]
}

export interface RolesResult {
    role: Pick<Tables<'roles'>, 'name'>
}
export interface AvailabilitiesResult {
    availability: Pick<Tables<'availability_types'>, 'name'>
}

export interface ProjectsResult extends Tables<'projects'> {
    stacks: ProjectsStacksResult[]
    products: { product: Pick<Tables<'supabase_products'>, 'name'> }[]
}


export interface ProjectsStacksResult extends Tables<'projects_stacks'> {
    stacks: StacksResult[]
}

export interface StacksResult extends Pick<Tables<'stacks'>, 'name'> { }

export interface EndorsementsResult extends Tables<'endorsements'> {
    profiles: Tables<'profiles'>
}
