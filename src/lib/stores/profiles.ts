import type { Profile } from '$lib/components/profile/mock';
import type { SupabaseClient } from '@supabase/supabase-js';
import { get, writable, type Writable } from 'svelte/store';

interface FilterOptions {
	stacks: string[];
	availibility: string[];
	experiences: string[];
}

export const createProfilesState = (init: Profile[], supabase: SupabaseClient) => {
	const initital = init;
	const profiles = writable(initital);
	const filter: Writable<FilterOptions> = writable({
		stacks: [],
		availibility: [],
		experiences: []
	});
	const sort = writable('');
	const filteredProfiles = writable(initital);

	filter.subscribe(async (filter) => {
		const s = get(sort);
		//TODO add both filter and sort constraints
		// const { data } = await supabase
		// 	.from('profiles')
		// 	.select('*')
		// .profiles.set(data as Profile[]);
	});

	sort.subscribe(async (sort) => {
		// const f = get(filter);
		// //TODO add both filter and sort constraints
		// const { data } = await supabase.from('profiles').select();
		// profiles.set(data as Profile[]);
	});
	filter.subscribe((newFilters) => {
		// filteredProfiles.set(
		// 	get(profiles).filter((profile) => {
		// 		if (
		// 			newFilters.availibility.length &&
		// 			!profile.availabilities.some((availability) =>
		// 				newFilters.availibility.includes(availability)
		// 			)
		// 		)
		// 			return false;
		// 		if (
		// 			!profile.projects
		// 				.map((project) =>
		// 					project.usedTech.some((experience) => newFilters.experiences.includes(experience))
		// 				)
		// 				.flat()
		// 				.some((bool) => bool)
		// 		)
		// 			return false;
		// 		if (
		// 			newFilters.experiences.length &&
		// 			!profile.projects.some((project) =>
		// 				project.usedTech.some((experience) => newFilters.experiences.includes(experience))
		// 			)
		// 		)
		// 			return false;
		// 		return true;
		// 	})
		// );
	});

	return {
		profiles,
		filter,
		sort
	};
};

export type CreateProfilesState = typeof createProfilesState;
