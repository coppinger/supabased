import type { Profile } from '$lib/components/profile/mock';
import type { SupabaseClient } from '@supabase/supabase-js';
import { get, writable, type Writable } from 'svelte/store';

interface FilterOptions {
	stacks: string[];
	availibility: string[];
	experiences: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createProfilesState = (init: Profile[], supabase: SupabaseClient) => {
	const initital = init;
	const profiles = writable(initital);
	const filteredProfiles = writable(initital);
	const filter: Writable<FilterOptions> = writable({
		stacks: [],
		availibility: [],
		experiences: []
	});
	const sort = writable('');

	filter.subscribe((newFilters) => {
		filteredProfiles.set(
			get(profiles).filter((profile) => {
				if (
					newFilters.availibility.length &&
					!profile.availabilities.some((availability) =>
						newFilters.availibility.includes(availability)
					)
				)
					return false;

				if (
					!profile.projects
						.map((project) =>
							project.usedTech.some((experience) => newFilters.experiences.includes(experience))
						)
						.flat()
						.some((bool) => bool)
				)
					return false;

				if (
					newFilters.experiences.length &&
					!profile.projects.some((project) =>
						project.usedTech.some((experience) => newFilters.experiences.includes(experience))
					)
				)
					return false;

				return true;
			})
		);
	});

	return {
		profiles,
		filteredProfiles,
		filter,
		sort
	};
};

export type CreateProfilesState = typeof createProfilesState;
