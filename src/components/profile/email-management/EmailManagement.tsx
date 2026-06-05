import { useUser } from "@clerk/tanstack-react-start";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
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
      <div className="flex flex-col">
        <p className="text-foreground/75 text-sm">Email</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {isLoaded ? (
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold">{primaryEmailAdress}</p>
                <Badge>Primary</Badge>
              </div>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
            <AddEmailDialog />
          </div>

          {emailAdresses?.map((email) => (
            <EmailRow isLoaded={isLoaded} email={email} key={email.id} />
          ))}
        </div>
      </div>
    </>
  );
}
