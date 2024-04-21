import { Box, Database, MousePointerClick, Triangle, Lock } from "lucide-svelte"

export const supabaseTech = [
    {
        name: 'DB',
        Icon: Database
    },
    {
        name: 'Auth',
        Icon: Lock
    },
    {
        name: 'Edge',
        Icon: Triangle
    },
    {
        name: 'Realtime',
        Icon: MousePointerClick
    },
    {
        name: 'Vector',
        Icon: Box
    }
] as const

export const allAvailabilities = ['Full Time', 'Part Time', 'Contract', 'Consulting', 'Task', 'MVP'] as const
