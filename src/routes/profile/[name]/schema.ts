
import { z } from 'zod'

export const endorseSchema = z.object({
  profile: z.string(),
})

export type EndorseSchema = typeof endorseSchema
