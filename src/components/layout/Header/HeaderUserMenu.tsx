import { Separator } from "#/components/ui/separator";
import { Skeleton } from "#/components/ui/skeleton";
import { formatUserName } from "#/lib/utils";
import { useUser } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function HeaderUserMenu() {
  const { user, isLoaded } = useUser();

  const userName = formatUserName({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const avatar = user?.imageUrl;

  return (
    <>
      <Link to="/favorites" className="relative flex items-center gap-1">
        <Heart fill="#000" />
        <p className="hidden text-sm font-semibold sm:block">Favorites</p>
      </Link>

      <Separator
        orientation="vertical"
        className="m-auto h-4.5 w-px bg-black"
      />
      {isLoaded ? (
        <Link to="/profile" className="relative flex items-center gap-1">
          <div className="aspect-square size-9 overflow-hidden rounded-full sm:size-11">
            <img
              src={avatar}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="hidden text-sm font-semibold sm:block">{userName}</p>
        </Link>
      ) : (
        <div className="relative flex items-center gap-1">
          <div className="aspect-square h-11 w-11 overflow-hidden rounded-full">
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="h-4 w-15" />
        </div>
      )}
    </>
  );
}
