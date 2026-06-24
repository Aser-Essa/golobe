import { getFormattedUser } from "#/lib/utils/user";
import type { Booking } from "#/lib/types";
import { useUser } from "@clerk/tanstack-react-start";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";

export default function Header({
  room,
  forPdf,
}: {
  room: Booking["room"];
  forPdf: boolean;
}) {
  const { user, isLoaded } = useUser();
  const { avatar, fullName } = getFormattedUser(user);

  return (
    <div
      className={cn(
        "flex h-24 w-full items-center justify-between gap-6 bg-[#8dd3ba] p-4 sm:gap-10 sm:p-6",
        forPdf && "gap-10! p-6!",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="aspect-square size-12 min-w-12 overflow-hidden rounded-full border border-white text-[rgba(17,34,17,0.3)]">
          {isLoaded ? (
            <img src={avatar} alt={`${fullName}`} className="size-full" />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
        {isLoaded ? (
          <p
            className={cn("text-lg font-bold sm:text-xl", forPdf && "text-xl!")}
          >
            {fullName}
          </p>
        ) : (
          <Skeleton className="h-6 w-30" />
        )}
      </div>
      <p className="max-w-60 text-right text-sm font-bold">
        <span>{room.name}</span>
        <span>
          {room.view_type ? `- ${room.view_type}` : ""} - {room.bed_type}
        </span>
      </p>
    </div>
  );
}
