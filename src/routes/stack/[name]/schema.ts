import { tags, type Tag } from '$lib/stacks'
import { z } from 'zod'

// TODO correct the types, these are just mocks. Fix in +page.svelte and +page.server.ts as well
export const formSchema = z.object({
    stackname: z.string().min(1),
    url: z.string().trim().url(),
    tags: z.string().refine(value => {
        const values = value.split(',').map(tag => tag.trim() as Tag)
        return values.every(tag => tags.includes(tag))
    }, {
        message: 'Invalid tags'
    }),
    username: z.string()
})

export type FormSchema = typeof formSchema
