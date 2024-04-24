import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js'
import { derived, get, writable, type Writable } from 'svelte/store'
import { PROFILE_QUERY, type ProfilesResult } from '$lib/db/query'
import type { Tables } from '$lib/types/DatabaseDefinitions'

interface FilterOptions {
	stacks: string[]
	availibility: string[]
	experiences: string[]
}

export const createProfilesState = (init: PostgrestSingleResponse<ProfilesResult[]>, supabase: SupabaseClient) => {
	const initital = init
	const filter: Writable<FilterOptions> = writable({
		stacks: [],
		availibility: [],
		experiences: []
	})
	const sort = writable('')
	const search = writable('')
	const profiles = derived([filter, sort, search], ([$filter, $sort, $search], set) => {

		let query = supabase
			.from('profiles')
			.select(PROFILE_QUERY)
			.neq('display_name', null)

		if ($search.length) query = query.textSearch('display_name', `${$search.replaceAll(' ', '+')}:*`)
		if ($filter.availibility.length) query = query.in('availabilities.availability.name', $filter.availibility)
		if ($filter.stacks.length) query = query.in('projects.stacks.stack.name', $filter.stacks)
		if ($filter.experiences.length) query = query.in('projects.products.product.name', $filter.experiences)


		query.returns<ProfilesResult[]>()
			.then(({ data, error }) => {
				if (!error) set(data)
				// else console.log(error)
			})

	}, initital.data)

	const activeFilters = derived([filter], ([$filter], set) => {
		const arr = Object.values($filter).flat()
		set(arr)
	}, Object.values(get(filter)).flat())

	const clearFilters = (str: string | undefined = undefined) => {

		filter.update(filter => {
			for (const key of Object.keys(filter) as [keyof typeof filter]) {
				if (!str) filter[key] = []
				else {
					const idx = filter[key].findIndex(item => item === str)
					if (idx !== -1) filter[key].splice(idx, 1)
				}
			}
			return filter
		})
	}

	return {
		profiles,
		filter,
		activeFilters,
		sort,
		search,
		clearFilters,
	}
}

export type CreateProfilesState = typeof createProfilesState
