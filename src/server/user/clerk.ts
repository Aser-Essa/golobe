import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";


export const removeClerkEmail = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      externalAccountId: z.string().nullish(),
      emailId: z.string(),
    }),
  )
  .handler(async ({ data, context: { userId } }) => {
    try {
      const { externalAccountId, emailId } = data;

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
