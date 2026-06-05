import { createUserSchema, updatePasswordSchema } from "#/lib/schemas/user";
import { supabase } from "#/lib/supabase";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const createUser = createServerFn({ method: "POST" })
  .inputValidator(createUserSchema)
  .handler(async ({ data: user }) => {
    const { error } = await supabase.from("users").insert(user);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  });

export const deleteUserFromDB = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  });

export const deleteClerkUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      externalAccountId: z.string().nullish(),
      emailId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const { userId, externalAccountId, emailId } = data;

      if (externalAccountId) {
        await clerkClient().users.deleteUserExternalAccount({
          userId,
          externalAccountId,
        });
      }

      await clerkClient().emailAddresses.deleteEmailAddress(emailId);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors[0].message);
    }
  });

export const verifyPassword = createServerFn({ method: "POST" })
  .inputValidator(z.object({ userId: z.string(), currentPassword: z.string() }))
  .handler(async ({ data: { userId, currentPassword } }) => {
    if (!currentPassword) throw new Error("Current password is required");
    try {
      const { verified } = await clerkClient().users.verifyPassword({
        userId,
        password: currentPassword,
      });

      return verified;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors[0].message);
    }
  });

export const updatePassword = createServerFn({ method: "POST" })
  .inputValidator(updatePasswordSchema)
  .handler(
    async ({ data: { userId, hasPassword, currentPassword, newPassword } }) => {
      try {
        if (hasPassword) {
          if (currentPassword === newPassword) {
            throw new Error(
              "New password must be different from current password",
            );
          }
        }

        await clerkClient().users.updateUser(userId, {
          password: newPassword,
        });
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message || error.errors[0].message);
      }
    },
  );
