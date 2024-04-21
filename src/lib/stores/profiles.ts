import type { Profile } from "$lib/components/profile/mock"
import type { SupabaseClient } from "@supabase/supabase-js"
import { get, writable, type Writable } from "svelte/store"

interface FilterOptions {
    stacks: string[]
    availibility: string[]
    experiences: string[]
}

export const createProfilesState = (init: Profile[], supabase: SupabaseClient) => {
    const initital = init
    const profiles = writable(initital)
    const filter: Writable<FilterOptions> = writable({ stacks: [], availibility: [], experiences: [] })
    const sort = writable('')

    filter.subscribe(async (filter) => {
        const s = get(sort)
        //TODO add both filter and sort constraints
        // const { data } = await supabase.from('profiles').select()
        // profiles.set(data as Profile[])
    })

    sort.subscribe(async (sort) => {
        const f = get(filter)
        //TODO add both filter and sort constraints
        // const { data } = await supabase.from('profiles').select()
        // profiles.set(data as Profile[])

    })

    return {
        profiles,
        filter,
        sort
    }
}

export type CreateProfilesState = typeof createProfilesState