import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 2
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const profileSchema = z.object({
	username: z.string().min(3).max(32).optional(),
	display_name: z.string().min(3).max(64).optional(),
	bio: z.string().max(160).optional(),
	location: z.string().optional(),
	pfp_url: z
		.instanceof(File, { message: 'Please upload a file.' } || z.string())
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max file size is 2 MB.')
		.refine(
			(f) => ACCEPTED_IMAGE_MIME_TYPES.includes(f.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		).optional(),
	availability: z.number().int().array(),
	products: z.number().int().array()
})

export type ProfileSchema = z.infer<typeof profileSchema>

const USERNAME = Object.freeze({
	SUCCESS: 'Nice, that username is available.',
	FAIL: 'That username is already taken.'
} as const)

// too lazy to add more
export const VALIDATIONS = Object.freeze({
	USERNAME
} as const)

