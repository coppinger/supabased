import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js'
import { derived, get, writable, type Writable } from 'svelte/store'
import { PROFILE_QUERY } from '$lib/db/query'
import type { PageData } from '../../routes/$types'

export interface FilterOptions {
	stacks: string[]
	availibility: string[]
	experiences: string[]
}

export const createProfilesState = (init: NonNullable<PageData['user']['profile']['data']>[], supabase: PageData['supabase']) => {
	const initital = init
	const filterBy: Writable<FilterOptions> = writable({
		stacks: [],
		availibility: [],
		experiences: []
	})
	const sortBy = writable('')
	const search = writable('')
	const profiles = derived([filterBy, sortBy, search], ([$filter, $sort, $search], set) => {

		let query = supabase
			.from('profiles')
			.select(PROFILE_QUERY)
			.neq('display_name', null)

		if ($search.length) query = query.textSearch('display_name', `${$search.replaceAll(' ', '+')}:*`)
		if ($filter.availibility.length) query = query.contains('availabilities', $filter.availibility)
		if ($filter.stacks.length) query = query.contains('stacks', $filter.stacks)
		if ($filter.experiences.length) query = query.contains('products', $filter.experiences)

		query.then(({ data, error }) => {
			if (!error) set(data)
		})

	}, initital)

	const activeFilters = derived([filterBy], ([$filter], set) => {
		const arr = Object.values($filter).flat()
		set(arr)
	}, Object.values(get(filterBy)).flat())

	const clearFilters = (str: string | undefined = undefined) => {

		filterBy.update(filter => {
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
		filterBy,
		activeFilters,
		sortBy,
		search,
		clearFilters,
	}
}

export type CreateProfilesState = typeof createProfilesState
