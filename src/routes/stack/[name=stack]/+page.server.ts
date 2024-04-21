import { fail, message, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";

export const load = (async ({ locals, params: { name } }) => {
  // TODO set constraints
  const stacks = locals.supabase.from('stacks').select()

  return {
    stacks
  }
}) satisfies PageServerLoad

export const actions = {

} satisfies Actions

