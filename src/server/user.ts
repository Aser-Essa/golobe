import { SupabaseStorageAvatarPath } from "#/lib/constants";
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

export const UpdateUserAvatar = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      dataUrl: z.string(),
    }),
  )
  .handler(async ({ data: { userId, dataUrl } }) => {
    try {
      const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64, "base64");
      const file = new File([buffer], "avatar.png", {
        type: "image/png",
      });

      await clerkClient().users.updateUserProfileImage(userId, { file });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const deleteUserAvatar = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      imagePath: z.string(),
    }),
  )
  .handler(async ({ data: { userId, imagePath } }) => {
    try {
      await clerkClient().users.deleteUserProfileImage(userId);

      const { error } = await supabase.storage
        .from("avatars")
        .remove([`${imagePath}`]);

      if (error) throw new Error(error.message);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const UploadUserAvatar = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      fileBase64: z.string(),
      fileName: z.string(),
      fileType: z.string(),
    }),
  )
  .handler(async ({ data: { userId, fileBase64, fileName, fileType } }) => {
    try {
      const buffer = Buffer.from(fileBase64, "base64");
      const file = new File([buffer], fileName, { type: fileType });

      await clerkClient().users.updateUserProfileImage(userId, { file });

      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          originalAvatarUrl: `${SupabaseStorageAvatarPath}/${userId}/${fileName}`,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });
