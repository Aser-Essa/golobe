import { getFormattedUser } from "#/lib/utils/user";
import { useUser } from "@clerk/tanstack-react-start";
import ManageAvatar from "./avatar-management/ManageAvatar";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";

export default function ProfileHeader() {
  const { user, isLoaded } = useUser();

  const { avatar, fullName } = getFormattedUser(user);

  if (!isLoaded) return <ProfileHeaderSkeleton />;

  return (
    <>
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="relative">
          <div className="border-salmon bg-foreground/10 aspect-square w-40 overflow-hidden rounded-full border-4">
            <img src={avatar} className="h-full w-full object-cover" />
          </div>
          <ManageAvatar />
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold sm:text-2xl">{fullName}.</p>
          <p className="text-foreground/75 text-sm sm:text-base">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </>
  );
}
