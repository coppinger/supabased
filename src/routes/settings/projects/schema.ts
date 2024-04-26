import { z } from 'zod'

export const projectSchema = z.object({
	arrays: z.array(z.object({
		project_name: z.string().min(3).max(32),
		project_url: z.string().url().optional(),
		repository_url: z.string().url().optional(),
		description: z.string().min(16).max(160),
	}))
})

export type ProjectSchema = z.infer<typeof projectSchema>
