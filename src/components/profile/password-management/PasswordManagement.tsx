import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";
import { useUser } from "@clerk/tanstack-react-start";
import PasswordManagementDialog from "./PasswordManagementDialog";

export default function PasswordManagement() {
  const { user, isLoaded } = useUser();

  const hasPassword = user?.passwordEnabled;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between flex-col gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <p className="text-foreground/75 text-sm">Password</p>
            {isLoaded ? (
              <p
                className={cn(
                  "text-base font-semibold",
                  !hasPassword && "text-foreground/40 italic select-none",
                )}
              >
                {hasPassword ? "************" : "User has no password"}
              </p>
            ) : (
              <Skeleton className="h-6 w-64" />
            )}
          </div>
          <PasswordManagementDialog />
        </div>
      </div>
    </>
  );
}
