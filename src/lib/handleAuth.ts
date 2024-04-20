import { supabase } from '$lib/db/client';

export async function handleMagicLink(email: string) {
	const { data, error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: true,
			emailRedirectTo: 'http://localhost:5173/'
		}
	});

	console.log('data: ', data);
	console.log('error: ', error);
}
