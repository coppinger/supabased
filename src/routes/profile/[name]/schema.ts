
import { z } from 'zod'

// TODO correct the types, these are just mocks. Fix in +page.svelte and +page.server.ts as well
export const endorseSchema = z.object({
  profile: z.string(),
  endorser: z.string()
})

export type EndorseSchema = typeof endorseSchema
