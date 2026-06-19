import {
  SupabaseStorageAvatarPath,
  SupabaseStorageBannerPath,
} from "#/lib/constants";
import { createUserSchema, updatePasswordSchema } from "#/lib/schemas/user";
import { supabase } from "#/lib/supabase";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
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

export const setUserAvatarMetadata = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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
  },
);

export const updateUserAvatar = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      dataUrl: z.string(),
    }),
  )
  .handler(async ({ data: { dataUrl } }) => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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

export const deleteUserAvatar = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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
  },
);

export const setUserBannerMetadata = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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
  },
);

export const updateUserBanner = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      dataUrl: z.string(),
    }),
  )
  .handler(async ({ data: { dataUrl } }) => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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

export const deleteUserBanner = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("User not found");

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
  },
);
