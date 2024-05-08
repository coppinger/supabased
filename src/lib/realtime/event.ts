import type { SupabaseClient } from "@supabase/supabase-js"

export class SupabaseRealtimeHandler<T> {
    private channel: ReturnType<SupabaseClient<T>['channel']>
    constructor(private supabase: SupabaseClient<T>, ...channel: Parameters<SupabaseClient<T>['channel']>) {
        this.channel = supabase.channel(...channel)
    }
    on(...params: Parameters<typeof this.channel['on']>) {
        return this
    }
    subscribe() {
        this.channel.subscribe()
        return this
    }
    unsubscribe() {
        this.channel.unsubscribe()
    }
}