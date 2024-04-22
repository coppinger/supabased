import { z } from 'zod';
import { imageUploadSchema } from '../imageUploadSchema';

export const profileSchema = z.object({
	username: z.string().min(3).max(32),
	display_name: z.string().min(3).max(64),
	bio: z.string().max(160),
	pfp_url: imageUploadSchema,
	location: z.string().default('Earth')
});

export type Profile = z.infer<typeof profileSchema>;
