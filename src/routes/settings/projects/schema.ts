import { z } from 'zod'

export const projectSchema = z.object({
	project_name: z.string().min(3).max(32),
	description: z.string().min(16).max(160),
	project_url: z.string().url().optional()
})

export type ProjectSchema = z.infer<typeof projectSchema>
