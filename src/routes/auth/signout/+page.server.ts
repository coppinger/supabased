export const actions = {
    default: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()

    }
}