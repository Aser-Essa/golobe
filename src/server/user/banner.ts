import { SupabaseStorageBannerPath } from "#/lib/constants";
import { supabase } from "#/lib/supabase";
import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

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
