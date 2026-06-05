import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { useReverification } from "@clerk/tanstack-react-start";
import type { EmailAddressResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../common/InputField";
import { Button } from "../ui/button";
import type { User } from "#/lib/types";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

type NewEmailFormProps = {
  user: User;
  setEmailObj: (emailObj: EmailAddressResource | undefined) => void;
  setIsVerifying: (isVerifying: boolean) => void;
};

export default function NewEmailForm({
  user,
  setEmailObj,
  setIsVerifying,
}: NewEmailFormProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email("Invalid email address"),
      }),
    ),
    defaultValues: {
      email: "",
    },
  });

  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );

  async function onSubmit(data: { email: string }) {
    const newEmail = data.email;
    if (!user || !newEmail) return;
    await user.reload();

    try {
      const res = await createEmailAddress(newEmail);

      await user.reload();
      const emailAddress = user.emailAddresses.find((a) => a.id === res?.id);
      setEmailObj(emailAddress);

      emailAddress?.prepareVerification({ strategy: "email_code" });

      setIsVerifying(true);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      throw new Error("Unknown error occurred");
    }
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Change email address</DialogTitle>
        <DialogDescription>
          Enter your new email address below.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          name="email"
          control={control}
          label="New Email Address"
          placeholder="john.doe@gmail.com"
          type="email"
          className="h-12 rounded-[6px]"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
