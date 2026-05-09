import z from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
});
