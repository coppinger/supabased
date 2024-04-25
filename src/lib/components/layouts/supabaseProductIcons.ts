import { Box, Cloud, Database, Lock, MousePointerClick, Triangle } from 'lucide-svelte'

type SupabaseProductsIcons = typeof Box | typeof Cloud | typeof Database | typeof Lock | typeof MousePointerClick | typeof Triangle
export const supabaseProductIcons: Record<string, SupabaseProductsIcons> = {
	Database: Database,
	Auth: Lock,
	Storage: Cloud,
	Edge: Triangle,
	Realtime: MousePointerClick,
	Vector: Box
} as const
