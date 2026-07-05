import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { useUser } from "@clerk/tanstack-react-start";
import type { EmailAddressResource } from "@clerk/types";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import NewEmailForm from "./NewEmailForm";
import VerifyCodeForm from "./VerifyCodeForm";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "#/components/ui/skeleton";

export default function AddEmailDialog() {
  const { isLoaded, isSignedIn, user } = useUser();

  const navigate = useNavigate({ from: "/profile/account/" });

  const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  if (!isLoaded) return <Skeleton className="h-12 w-35 rounded-sm" />;

  if (!isSignedIn) {
    navigate({ to: "/", viewTransition: true });
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    setIsVerifying(false);
    if (open) {
      setSessionKey((prev) => prev + 1);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} key={sessionKey}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-12 min-w-35 bg-white font-medium"
        >
          <CirclePlus />
          <p>Add email</p>
        </Button>
      </DialogTrigger>

      {isVerifying ? (
        <VerifyCodeForm
          emailObj={emailObj}
          onSuccess={() => setIsOpen(false)}
        />
      ) : (
        <NewEmailForm
          user={user}
          setEmailObj={setEmailObj}
          setIsVerifying={setIsVerifying}
        />
      )}
    </Dialog>
  );
}
