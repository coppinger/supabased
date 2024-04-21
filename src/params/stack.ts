import type { ParamMatcher } from "@sveltejs/kit"
import { stacks } from '$lib/stacks'

export const match = ((param): param is typeof stacks[number]['name'] => {
    return stacks.some(stack => stack.name.toLowerCase() === param.toLowerCase())
}) satisfies ParamMatcher