import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { Skeleton } from "#/components/ui/skeleton";
import { useUser } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { CirclePlus, FilePenLine } from "lucide-react";
import { useState } from "react";
import NewPasswordStep from "./NewPasswordStep";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function PasswordManagementDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const hasPassword = user?.passwordEnabled;

  const navigate = useNavigate({ from: "/profile/account/" });

  if (!isLoaded) return <Skeleton className="h-12 w-35 rounded-sm" />;

  if (!isSignedIn) {
    navigate({ to: "/" });
  }

  function onSuccess() {
    setIsOpen(false);
    navigate({ reloadDocument: true, resetScroll: false });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-12 min-w-35 bg-white font-medium"
        >
          {hasPassword ? <FilePenLine /> : <CirclePlus />}
          <p>{hasPassword ? "Change password" : "Add password"}</p>
        </Button>
      </DialogTrigger>

      {hasPassword ? (
        <UpdatePasswordForm onSuccess={onSuccess} />
      ) : (
        <NewPasswordStep onSuccess={onSuccess} />
      )}
    </Dialog>
  );
}
