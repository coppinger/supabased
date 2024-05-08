import { z } from 'zod'

export const projectSchema = z.object({
	id: z.union([z.string().uuid(), z.string()]).optional(),
	project_name: z.union([z.string().min(3).max(32), z.string().length(0)]).optional(),
	project_url: z.union([z.string().url(), z.string().length(0)]).optional(),
	repository_url: z.union([z.string().url(), z.string().length(0)]).optional(),
	description: z.union([z.string().min(16).max(160), z.string().length(0)]).optional(),
	stacks: z.string().array().optional(),
	products: z.string().array().optional(),
}).refine(form => form.project_url !== form.repository_url, {
	message: 'Website and Github URL should be different',
	path: ['project_url'],
})
export type ProjectSchema = z.infer<typeof projectSchema>
