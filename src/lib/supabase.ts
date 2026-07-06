import { getTokenServer } from "#/server/auth";
import { createClient } from "@supabase/supabase-js";
import { env } from "./schemas";

export function createServerSupabaseClient() {
  return createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    accessToken: async () => (await getTokenServer()).token,
  });
}

export function createServiceSupabaseClient() {
  return createClient(env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}
