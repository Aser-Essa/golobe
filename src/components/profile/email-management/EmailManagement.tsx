import { Badge } from "#/components/ui/badge";
import { Skeleton } from "#/components/ui/skeleton";
import { useUser } from "@clerk/tanstack-react-start";
import AddEmailDialog from "./AddEmailDialog";
import EmailRow from "./EmailRow";

export default function EmailManagement() {
  const { user, isLoaded } = useUser();

  const primaryEmailAdress = user?.primaryEmailAddress?.emailAddress;

  const emailAdresses = user?.emailAddresses.filter(
    (email) => email.emailAddress !== primaryEmailAdress,
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-foreground/75 text-sm">Email</p>
            {isLoaded ? (
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold">{primaryEmailAdress}</p>
                <Badge>Primary</Badge>
              </div>
            ) : (
              <Skeleton className="h-6 w-64" />
            )}
          </div>
          <AddEmailDialog />
        </div>

        {emailAdresses?.map((email) => (
          <EmailRow isLoaded={isLoaded} email={email} key={email.id} />
        ))}
      </div>
    </>
  );
}
