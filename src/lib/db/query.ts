export const PROFILE_QUERY = `*, 
projects(*,projects_stacks(*, stack:stacks(*)), projects_products(*, product:products(*))), 
endorsements!endorsements_endorsement_to_fkey(*, profiles!endorsements_endorsed_by_fkey(*))` as const
