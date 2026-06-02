import { supabase } from "#/lib/supabase";
import type { CreateUserType } from "#/lib/types";

export async function createUser({ user }: { user: CreateUserType }) {
  const { error } = await supabase.from("users").insert(user);

  console.log(error);

  if (error) {
    throw new Error(error.message);
  }
}




export async function deleteUser({ id }: { id: string }) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  console.log(error);

  if (error) {
    throw new Error(error.message);
  }
}
