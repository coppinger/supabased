import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { loginSchema } from './loginSchema';

export const load = async ({ locals: { safeGetSession } }) => {
	const form = await superValidate(zod(loginSchema));

	return {
		session: await safeGetSession(),
		form
	};
};
