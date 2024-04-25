import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../$types"

export const load = (async ({ locals: { supabase } }) => {

  return {

  }
}) satisfies LayoutServerLoad
