export const profiles = [
	{
		firstName: 'James',
		lastName: 'Coffee',
		profile_pic: 'https://github.com/shadcn.png',
		devType: 'full_stack',
		city: 'Melbourne',
		country: 'Australia',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		endorsement_num: 37,
		availabilities: ['Full Time', 'Consulting', 'Task', 'MVP'],
		twitter: 'james_coffee',
		github: 'james_coffee',
		projects: [
			{
				name: 'ASX Bot',
				url: 'https://www.asxbot.com',
				usedTech: ['Vector', 'Auth', 'Edge'],
				description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
				github: 'https://github.com/meta-llama/llama3',
				link: 'https://llama.meta.com/'
			},
			{
				name: 'ASX Bot',
				url: 'https://www.asxbot.com',
				usedTech: ['Vector', 'Auth', 'Edge'],
				description: 'A reddit sentiment analysis tool for the Australian Stock Exchange',
				link: 'https://www.shadcn-svelte.com/docs/components/button#link-1'
			}
		]
	},

	{
		firstName: 'Emma',
		lastName: 'Smith',
		profile_pic: 'https://github.com/emmasmith.png',
		devType: 'frontend',
		city: 'London',
		country: 'United Kingdom',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		endorsement_num: 15,
		availabilities: ['Part Time', 'Freelance'],
		twitter: 'emma_smith',
		github: 'emma_smith',
		projects: [
			{
				name: 'E-commerce Website',
				url: 'https://www.ecommerce.com',
				usedTech: ['React', 'Redux', 'Node.js'],
				description: 'An online store for selling various products',
				github: 'https://github.com/emmasmith/ecommerce',
				link: 'https://www.ecommerce.com'
			},
			{
				name: 'Portfolio Website',
				url: 'https://www.emmasmith.com',
				usedTech: ['HTML', 'CSS', 'JavaScript'],
				description: 'A personal website showcasing my work and skills',
				link: 'https://www.emmasmith.com'
			}
		]
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		profile_pic: 'https://github.com/johndoe.png',
		devType: 'backend',
		city: 'New York',
		country: 'United States',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		endorsement_num: 10,
		availabilities: ['Full Time', 'Contract'],
		twitter: 'johndoe',
		github: 'johndoe',
		projects: [
			{
				name: 'Blog API',
				url: 'https://www.blogapi.com',
				usedTech: ['Node.js', 'Express', 'MongoDB'],
				description: 'A RESTful API for managing blog posts',
				github: 'https://github.com/johndoe/blog-api',
				link: 'https://www.blogapi.com'
			},
			{
				name: 'Task Management App',
				url: 'https://www.taskapp.com',
				usedTech: ['React', 'Redux', 'Firebase'],
				description: 'An app for managing tasks and to-do lists',
				link: 'https://www.taskapp.com'
			}
		]
	}
];

export type Profile = (typeof profiles)[number];
