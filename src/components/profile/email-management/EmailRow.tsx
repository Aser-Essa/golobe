import type { EmailAddressResource } from "@clerk/types";
import { CircleCheck } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { Skeleton } from "#/components/ui/skeleton";
import MakeEmailPrimary from "./MakeEmailPrimary";
import RemoveEmail from "./RemoveEmail";
import VerifyCodeForm from "./VerifyCodeForm";

type EmailRowProps = {
  email: EmailAddressResource;
  isLoaded: boolean;
};

export default function EmailRow({ email, isLoaded }: EmailRowProps) {
  const emailStatus =
    email.verification.status === "verified"
      ? email.verification.status
      : "unverified";

  const isVerified = emailStatus === "verified";

  return (
    <div className="flex items-center justify-between flex-col gap-3 sm:flex-row">
      {isLoaded ? (
        <div className="flex items-center gap-4">
          <p className="text-base font-semibold">{email.emailAddress}</p>
          <Badge variant={!isVerified ? "destructive" : "secondary"}>
            {emailStatus}
          </Badge>
        </div>
      ) : (
        <Skeleton className="h-6 w-32" />
      )}

      <div className="flex flex-row-reverse items-center gap-2">
        {isVerified ? (
          <MakeEmailPrimary emailId={email.id} />
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="h-12 min-w-35 bg-white font-medium"
              >
                <CircleCheck />
                <p>Verify Email</p>
              </Button>
            </DialogTrigger>
            <VerifyCodeForm emailObj={email} />
          </Dialog>
        )}
        <RemoveEmail email={email} />
      </div>
    </div>
  );
}
