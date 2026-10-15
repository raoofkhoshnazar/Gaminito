import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase: SupabaseClient | null = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function getBackendHealth() {
  if (!supabase) {
    return { healthy: false, reason: "not-configured" as const };
  }

  const { data, error } = await supabase.rpc("app_health");

  if (error) {
    return { healthy: false, reason: "unavailable" as const };
  }

  return { healthy: data?.status === "ok", reason: "ok" as const };
}
