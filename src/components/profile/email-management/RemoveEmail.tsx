import { Button } from "#/components/ui/button";
import { removeClerkEmail } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import type { EmailAddressResource } from "@clerk/types";
import { CircleX } from "lucide-react";
import { toast } from "sonner";

export default function RemoveEmail({
  email,
}: {
  email: EmailAddressResource;
}) {
  const { user } = useUser();

  const userId = user?.id;
  const emailId = email.id;

  const externalAccountId = user?.externalAccounts.find(
    (acc) => acc.emailAddress === email.emailAddress,
  )?.id;

  console.log(userId, externalAccountId, emailId);

  async function handleClick() {
    if (!userId || !emailId) return;

    await removeClerkEmail({
      data: { externalAccountId, emailId },
    });

    toast.success("Email removed successfully");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await user.reload();
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
