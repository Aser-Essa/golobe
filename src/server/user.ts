import { createUserSchema } from "#/lib/schemas/user";
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
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Unknown error occurred");
    }
  });
