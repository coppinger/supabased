import { profiles as mockProfiles } from '$lib/components/profile/mock.js'

export async function load({ locals: { supabase } }) {
    // const { data } = await supabase.from('table').select();

    //FIXME DELETEME when we have actual profile data
    const profiles = mockProfiles

    return {
        profiles
    }
}
