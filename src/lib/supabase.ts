import { getTokenServer } from "#/server/auth";
import { createClient } from "@supabase/supabase-js";
import { env } from "./schemas";

export function createServerSupabaseClient() {
  return createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    accessToken: async () => (await getTokenServer()).token,
  });
}
