import { updatePasswordSchema } from "#/lib/schemas/user";
import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";



export const verifyPassword = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(z.object({ currentPassword: z.string() }))
  .handler(async ({ data: { currentPassword }, context: { userId } }) => {
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
  .middleware([authFnMiddleware])
  .inputValidator(updatePasswordSchema)
  .handler(
    async ({
      data: { hasPassword, currentPassword, newPassword },
      context: { userId },
    }) => {
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
