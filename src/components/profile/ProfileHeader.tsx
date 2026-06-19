import { useUser } from "@clerk/tanstack-react-start";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";
import { getUserName } from "#/lib/utils";
import ManageAvatar from "./avatar-management/ManageAvatar";

export default function ProfileHeader() {
  const { user, isLoaded } = useUser();

  const avatar =
    (user?.publicMetadata.avatarUrl as string) ||
    (user?.publicMetadata.originalAvatarUrl as string) ||
    user?.imageUrl ||
    "/profile.png";

  const fullUserName = getUserName(user);

  if (!isLoaded) return <ProfileHeaderSkeleton />;

  return (
    <>
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="relative">
          <div className="border-salmon aspect-square w-40 overflow-hidden rounded-full border-4">
            <img src={avatar} className="h-full w-full object-cover" />
          </div>
          <ManageAvatar />
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold sm:text-2xl">{fullUserName}.</p>
          <p className="text-foreground/75 text-sm sm:text-base">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </>
  );
}
