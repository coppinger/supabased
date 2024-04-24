import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte'

export const supabaseProductIcons = {
	Database: Database,
	Auth: Lock,
	Storage: Cloud,
	Edge: Triangle,
	Realtime: MousePointerClick,
	Vector: Box
} as const
