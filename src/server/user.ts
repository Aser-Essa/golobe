import {
  SupabaseStorageAvatarPath,
  SupabaseStorageBannerPath,
} from "#/lib/constants";
import { createUserSchema, updatePasswordSchema } from "#/lib/schemas/user";
import { supabase } from "#/lib/supabase";
import type { CreateUserType } from "#/lib/types";
import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getUser = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    const user = await clerkClient().users.getUser(userId);

    return JSON.parse(JSON.stringify(user));
  });

export const createUserDB = async ({ user }: { user: CreateUserType }) => {
  const { data, error } = await supabase.from("users").upsert([user]).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(createUserSchema)
  .handler(async ({ data: user }) => {
    return await createUserDB({ user });
  });

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

export const deleteUserFromDBServerFn = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await deleteUserDB(id);
  });

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

export const setUserAvatarMetadata = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    try {
      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          originalAvatarUrl: `${SupabaseStorageAvatarPath}/${userId}/avatar.png?t=${Date.now()}`,
          avatarUrl: `${SupabaseStorageAvatarPath}/${userId}/avatar.png?t=${Date.now()}`,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const updateUserAvatar = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      dataUrl: z.string(),
    }),
  )
  .handler(async ({ data: { dataUrl }, context: { userId } }) => {
    try {
      const [, base64] = dataUrl.split(",");
      const buffer = Buffer.from(base64, "base64");
      const file = new File([buffer], `cropped-avatar.png`, {
        type: "image/png",
      });

      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${userId}/${file.name}`, file, {
          upsert: true,
          cacheControl: "3600",
        });

      if (error) {
        throw new Error(error.message);
      }

      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          avatarUrl: `${SupabaseStorageAvatarPath}/${userId}/${file.name}?t=${Date.now()}`,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const deleteUserAvatar = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    try {
      const imagePaths = [
        `${userId}/avatar.png`,
        `${userId}/cropped-avatar.png`,
      ];

      const { error } = await supabase.storage
        .from("avatars")
        .remove(imagePaths);

      if (error && error.message !== "Object not found")
        throw new Error(error.message);

      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          avatarUrl: "",
          originalAvatarUrl: "",
        },
      });

      try {
        await clerkClient().users.deleteUserProfileImage(userId);
      } catch (err: any) {
        if (err?.errors?.[0]?.code !== "image_not_found") {
          throw err;
        }
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const setUserBannerMetadata = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    try {
      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          originalBannerUrl: `${SupabaseStorageBannerPath}/${userId}/banner.png?t=${Date.now()}`,
          bannerUrl: `${SupabaseStorageBannerPath}/${userId}/banner.png?t=${Date.now()}`,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const updateUserBanner = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      dataUrl: z.string(),
    }),
  )
  .handler(async ({ data: { dataUrl }, context: { userId } }) => {
    try {
      const [, base64] = dataUrl.split(",");
      const buffer = Buffer.from(base64, "base64");
      const file = new File([buffer], `cropped-banner.png`, {
        type: "image/png",
      });

      const { error } = await supabase.storage
        .from("banners")
        .upload(`${userId}/${file.name}`, file, {
          upsert: true,
          cacheControl: "3600",
        });

      if (error) {
        throw new Error(error.message);
      }

      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          bannerUrl: `${SupabaseStorageBannerPath}/${userId}/${file.name}?t=${Date.now()}`,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });

export const deleteUserBanner = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    try {
      const imagePaths = [
        `${userId}/banner.png`,
        `${userId}/cropped-banner.png`,
      ];

      const { error } = await supabase.storage
        .from("banners")
        .remove(imagePaths);

      if (error && error.message !== "Object not found")
        throw new Error(error.message);

      await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          bannerUrl: "",
          originalBannerUrl: "",
        },
      });

      try {
        await clerkClient().users.deleteUserProfileImage(userId);
      } catch (err: any) {
        if (err?.errors?.[0]?.code !== "image_not_found") {
          throw err;
        }
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || error.errors?.[0]?.message);
    }
  });
