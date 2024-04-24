import type { Tables } from "$lib/types/DatabaseDefinitions"

export const PROFILE_QUERY = `*, 
profile_availability_types(*, availability_types(id, name)), 
profiles_roles(*, roles(id, name)), 
projects(*, projects_stacks!projects_stacks_project_id_fkey(*, stacks!projects_stacks_stack_id_fkey(*))), 
endorsements!endorsements_endorsement_to_fkey(*, profiles!endorsements_endorsed_by_fkey(*))` as const

export interface ProfilesResult extends Tables<'profiles'> {
    profiles_roles: Tables<'profiles_roles'>[]
    projects: ProjectsResult[]
    profile_availability_types: Tables<'profile_availability_types'>[]
    endorsements: EndorsementsResult[]
}

export interface ProjectsResult extends Tables<'projects'> {
    projects_stacks: ProjectsStacksResult[]
}
export interface ProjectsStacksResult extends Tables<'projects_stacks'> {
    stacks: StacksResult[]
}

export interface StacksResult extends Tables<'stacks'> { }

export interface EndorsementsResult extends Tables<'endorsements'> {
    profiles: Tables<'profiles'>
}