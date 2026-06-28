import type { useUser } from "@clerk/tanstack-react-start";
import type { User } from "@clerk/tanstack-react-start/server";
import type { UserJSON } from "@clerk/backend";
import { parseISO } from "date-fns";

export type ClerkUser = ReturnType<typeof useUser>["user"];

type MinimalUser = {
  unsafeMetadata: Record<string, unknown>;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export const getFullName = (user?: MinimalUser | null) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const displayName = (user?.unsafeMetadata.displayName as string)?.trim();

  if (displayName) return displayName;

  if (user?.fullName?.trim()) return user.fullName;

  const first = user?.firstName?.trim();
  const last = user?.lastName?.trim();

  if (first || last) {
    return `${first ?? ""} ${last ?? ""}`.trim();
  }
  return "";
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

export function getFormattedUser(
  user: ClerkUser | null | undefined | User,
  isLoaded: boolean,
) {
  if (!user) {
    return {
      fullName: "",
      userName: "",
      email: "",
      avatar: "/",
      banner: "/",
      phoneNumber: "",
      address: "",
      birthDate: undefined,
    };
  }

  const fullName = getFullName(user);

  const userName = formatUserName({
    firstName: fullName.split(" ")[0],
    lastName: fullName.split(" ")[1],
  });

  const avatar =
    (user.publicMetadata.avatarUrl as string) ||
    (user.publicMetadata.originalAvatarUrl as string) ||
    user.imageUrl ||
    (isLoaded ? "/profile.png" : "");

  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses.at(0)?.emailAddress;

  const banner =
    (user.publicMetadata.bannerUrl as string) ||
    (user.publicMetadata.originalBannerUrl as string) ||
    (isLoaded ? "/user-banner.png" : "");

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
    fullName,
    userName,
    avatar,
    email,
    banner,
    phoneNumber,
    address,
    birthDate,
  };
}
export function getFormattedUserJson(user: UserJSON) {
  if (!user.id) {
    return {
      fullName: "",
      userName: "",
      email: "",
      avatar: "/profile.png",
      banner: "/",
      phoneNumber: "",
      address: "",
      birthDate: undefined,
    };
  }

  const MinimalUser = {
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: getFullName({
      firstName: user.first_name,
      lastName: user.last_name,
      unsafeMetadata: user.unsafe_metadata,
    }),
    unsafeMetadata: user.unsafe_metadata,
  };

  const fullName = getFullName(MinimalUser);

  const userName = formatUserName({
    firstName: fullName.split(" ")[0],
    lastName: fullName.split(" ")[1],
  });

  const avatar =
    (user.public_metadata.avatarUrl as string) ||
    (user.public_metadata.originalAvatarUrl as string) ||
    user.image_url ||
    "/profile.png";

  const primaryEmailAddress = user.email_addresses.find(
    (e) => e.id === user.primary_email_address_id,
  )?.email_address;

  const email =
    primaryEmailAddress || user.email_addresses.at(0)?.email_address || "";

  const banner =
    (user.public_metadata.bannerUrl as string) ||
    (user.public_metadata.originalBannerUrl as string);

  const phoneNumber = user.unsafe_metadata.phoneNumber
    ? String(user.unsafe_metadata.phoneNumber)
    : "";

  const address = user.unsafe_metadata.address
    ? String(user.unsafe_metadata.address)
    : "";

  const birthDate = user.unsafe_metadata.birthDate
    ? parseISO(user.unsafe_metadata.birthDate as string)
    : undefined;

  return {
    fullName,
    userName,
    avatar,
    email,
    banner,
    phoneNumber,
    address,
    birthDate,
  };
}
