import { Button } from "#/components/ui/button";
import { useReverification, useUser } from "@clerk/tanstack-react-start";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";

export default function MakeEmailPrimary({ emailId }: { emailId: string }) {
  const { user } = useUser();

  const verifyEmail = useReverification(() =>
    user?.update({
      primaryEmailAddressId: emailId,
    }),
  );

  async function handleClick() {
    await verifyEmail();
    toast.success("Email changed successfully");
  }

  return (
    <Button
      variant={"outline"}
      className="h-12 min-w-35 bg-white font-medium"
      onClick={handleClick}
    >
      <CircleCheck />
      <p>Make primary</p>
    </Button>
  );
}
