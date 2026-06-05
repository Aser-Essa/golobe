import { deleteClerkUser } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import type { EmailAddressResource } from "@clerk/types";
import { useNavigate } from "@tanstack/react-router";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function RemoveEmail({
  email,
}: {
  email: EmailAddressResource;
}) {
  const navigate = useNavigate({ from: "/profile/account/" });

  const { user } = useUser();

  const userId = user?.id;
  const emailId = email.id;

  const externalAccountId = user?.externalAccounts.find(
    (acc) => acc.emailAddress === email.emailAddress,
  )?.id;

  console.log(userId, externalAccountId, emailId);

  async function handleClick() {
    if (!userId || !emailId) return;

    await deleteClerkUser({
      data: { userId, externalAccountId, emailId },
    });

    toast.success("Email removed successfully");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate({ reloadDocument: true });
  }
  return (
    <Button
      variant={"destructive"}
      className="border-destructive/40 bg-destructive/5 h-12 min-w-35 font-medium"
      onClick={handleClick}
    >
      <CircleX />
      <p>Remove</p>
    </Button>
  );
}
