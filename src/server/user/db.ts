import { supabase } from "#/lib/supabase";
import type { CreateUserType } from "#/lib/types";


export const createUserDB = async ({ user }: { user: CreateUserType }) => {
  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select("id, is_active")
    .eq("email", user.email)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  if (existingUser) {
    if (existingUser.is_active) {
      throw new Error("User already exists");
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        ...user,
        is_active: true,
      })
      .eq("email", user.email)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUserDB = async ({
  userId,
  user,
}: {
  userId: string;
  user: CreateUserType;
}) => {
  if (!user.id) {
    throw new Error("User ID is required");
  }

  const { error } = await supabase.from("users").update(user).eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return user;
};

export const deleteUserDB = async (id: string) => {
  const { error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
