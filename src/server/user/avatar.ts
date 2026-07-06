import { SupabaseStorageAvatarPath } from "#/lib/constants";
import { createServerSupabaseClient } from "#/lib/supabase";
import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

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

      const supabase = createServerSupabaseClient();

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

      const supabase = createServerSupabaseClient();

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
