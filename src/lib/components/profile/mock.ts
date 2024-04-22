export type Profile = {
	availibility: string | null;
	bio: string | null;
	created_at: string | null;
	deleted_at: string | null;
	display_name: string | null;
	github_username: string | null;
	id: string;
	linkedin_url: string | null;
	location: string | null;
	pfp_url: string | null;
	skills: string | null;
	timezone: string | null;
	twitter_username: string | null;
	updated_at: string | null;
	website_url: string | null;
};

export const profiles = [
	{
		availibility: 'Available',
		bio: 'Experienced software developer',
		created_at: '2023-01-10T12:00:00Z',
		deleted_at: null,
		display_name: 'John Doe',
		github_username: 'johndoe',
		id: '1',
		linkedin_url: 'https://www.linkedin.com/in/johndoe/',
		location: 'San Francisco, CA',
		pfp_url: 'https://example.com/pfp/johndoe.jpg',
		skills: 'TypeScript, React',
		timezone: 'PST',
		twitter_username: 'johndoe_dev',
		updated_at: '2023-04-01T12:00:00Z',
		website_url: 'https://johndoe.com'
	}
] satisfies Profile[];
