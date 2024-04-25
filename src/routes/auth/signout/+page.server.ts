import { redirect } from "@sveltejs/kit"

export const actions = {
    default: async ({ locals: { supabase, safeGetSession }, request }) => {
        const { session } = await safeGetSession()

        if (session) {
            await supabase.auth.signOut()
            redirect(303, request.url)
        }
    }
}