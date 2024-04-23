import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email()
})

export const LoginSchema = typeof loginSchema