import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { loginSchema } from './schema'

export const load = async ({ locals: { safeGetSession } }) => {
	const form = await superValidate(zod(loginSchema))

	return {
		session: await safeGetSession(),
		form
	}
}
