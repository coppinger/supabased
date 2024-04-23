export const load = async ({ locals: { safeGetSession } }) => {
	return {
		session: await safeGetSession()
	};
};
