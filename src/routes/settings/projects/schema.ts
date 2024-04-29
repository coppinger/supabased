import { z } from 'zod'

export const projectSchema = z.object({
	project_name: z.string().min(3).max(32),
	project_url: z.string().url().optional().nullable().default(null),
	repository_url: z.string().url(),
	description: z.string().min(16).max(160).optional().nullable().default(null),
	stacks: z.string().array().optional(),
	products: z.string().array().optional(),
}).refine(form => form.project_url !== form.repository_url, {
	message: 'Website and Github URL should be different',
	path: ['project_url'],
})
export type ProjectSchema = z.infer<typeof projectSchema>
