import { useUser } from "@clerk/tanstack-react-start";

import { useState } from "react";
import { cn } from "#/lib/utils";
import { getFormattedUser } from "#/lib/utils/user";
import { Skeleton } from "#/components/ui/skeleton";
import ManageBanner from "./ManageBanner";

export default function ProfileBanner() {
  const { user, isLoaded } = useUser();

  const [imgLoaded, setImgLoaded] = useState(false);

  const { banner } = getFormattedUser(user, isLoaded);

  return (
    <div className="bg-foreground/30! relative h-87.5 w-full overflow-hidden rounded-[12px]">
      {!isLoaded && !imgLoaded ? (
        <Skeleton className="bg-foreground/30! absolute inset-0 z-10 h-[350px] w-full" />
      ) : null}
      <img
        src={banner}
        className={cn(
          "h-full w-full object-cover transition-all duration-300 ease-in-out",
          !imgLoaded ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => setImgLoaded(true)}
      />
      <ManageBanner />
    </div>
  );
}
