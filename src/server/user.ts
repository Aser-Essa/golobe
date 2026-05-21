import { supabase } from "#/lib/supabase";
import type { CreateUserType } from "#/lib/types";

export async function createUser({ user }: { user: CreateUserType }) {
  const { error } = await supabase.from("users").insert(user);

  console.log(error);

  if (error) {
    throw new Error(error.message);
  }
}
