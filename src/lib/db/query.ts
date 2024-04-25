import type { Tables } from '$lib/types/DatabaseDefinitions'

export const PROFILE_QUERY = `*, 
projects!inner(*), 
endorsements!endorsements_endorsement_to_fkey(*, profiles!endorsements_endorsed_by_fkey(*))` as const

export interface ProfilesResult extends Tables<'profiles'> {
    projects: ProjectsResult[]
    endorsements: EndorsementsResult[]
}
export interface ProjectsResult extends Tables<'projects'> {
    stacks: ProjectsStacksResult[]
    products: { product: Pick<Tables<'products'>, 'name'> }[]
}

export interface ProjectsStacksResult extends Tables<'projects_stacks'> {
    stacks: StacksResult[]
}

export interface StacksResult extends Pick<Tables<'stacks'>, 'name'> { }

export interface EndorsementsResult extends Tables<'endorsements'> {
    profiles: Tables<'profiles'>
}
