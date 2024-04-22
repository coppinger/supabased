import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const imageUploadSchema = z
	.instanceof(File, { message: 'Please upload a file.' } || z.string())
	.refine((f) => f.size < MAX_FILE_SIZE, 'Max file size is 2 MB.')
	.refine(
		(f) => ACCEPTED_IMAGE_MIME_TYPES.includes(f.type),
		'Only .jpg, .jpeg, .png and .webp formats are supported.'
	);
