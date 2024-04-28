import type { Tables } from '$lib/types/DatabaseDefinitions'

export const PROFILE_QUERY = `*, 
projects!inner(*,projects_stacks(*, stack:stacks(*)), projects_products(*, product:products(*))), 
endorsements!endorsements_endorsement_to_fkey(*, profiles!endorsements_endorsed_by_fkey(*))` as const

export interface ProfilesResult extends Tables<'profiles'> {
    projects: ProjectsResult[]
    endorsements: EndorsementsResult[]
}
export interface ProjectsResult extends Tables<'projects'> {
    projects_stacks: ProjectsStacksResult[]
    projects_products: ProjectsProductsResult[]
}

export interface ProjectsStacksResult extends Tables<'projects_stacks'> {
    stack: StacksResult
}
export interface ProjectsProductsResult extends Tables<'projects_products'> {
    product: ProductsResult
}

export interface StacksResult extends Tables<'stacks'> { }
export interface ProductsResult extends Tables<'products'> { }

export interface EndorsementsResult extends Tables<'endorsements'> {
    profiles: Tables<'profiles'>
}
