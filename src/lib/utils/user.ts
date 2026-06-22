import type { useUser } from "@clerk/tanstack-react-start";
import type { User } from "@clerk/tanstack-react-start/server";
import { parseISO } from "date-fns";

export type ClerkUser = ReturnType<typeof useUser>["user"];

type MinimalUser = {
  unsafeMetadata: Record<string, unknown>;
  fullName?: string | null;
};

export const getUserName = (user: MinimalUser | null | undefined) => {
  return typeof user?.unsafeMetadata.displayName === "string"
    ? user.unsafeMetadata.displayName
    : (user?.fullName ?? "");
};

export const formatUserName = ({
  firstName,
  lastName,
}: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
}) => {
  const userName = `${firstName ?? ""} ${
    lastName ? lastName[0].toUpperCase() + "." : ""
  }`.trim();

  return userName;
};

export function getFormattedUser(user: ClerkUser | null | undefined | User) {
  if (!user) {
    return {
      fullName: "",
      userName: "",
      email: "",
      avatar: "/profile.png",
      banner: "/user-banner.png",
      phoneNumber: "",
      address: "",
      birthDate: undefined,
    };
  }

  const fullUserName = getUserName(user);

  const userName = formatUserName({
    firstName: fullUserName.split(" ")[0],
    lastName: fullUserName.split(" ")[1],
  });

  const avatar =
    (user.publicMetadata.avatarUrl as string) ||
    (user.publicMetadata.originalAvatarUrl as string) ||
    user.imageUrl ||
    "/profile.png";

  const email = user.primaryEmailAddress?.emailAddress;

  const banner =
    (user.publicMetadata.bannerUrl as string) ||
    (user.publicMetadata.originalBannerUrl as string) ||
    "/user-banner.png";

  const phoneNumber = user.unsafeMetadata.phoneNumber
    ? String(user.unsafeMetadata.phoneNumber)
    : "";

  const address = user.unsafeMetadata.address
    ? String(user.unsafeMetadata.address)
    : "";

  const birthDate = user.unsafeMetadata.birthDate
    ? parseISO(user.unsafeMetadata.birthDate as string)
    : undefined;

  return {
    fullName: fullUserName,
    userName,
    avatar,
    email,
    banner,
    phoneNumber,
    address,
    birthDate,
  };
}
