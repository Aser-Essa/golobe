import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

import InputField from "#/components/common/InputField";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { confirmNewPasswordSchema } from "#/lib/schemas/user";
import { updatePassword } from "#/server/user/user";
import { useUser } from "@clerk/tanstack-react-start";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

type NewPasswordStepProps = {
  onSuccess: () => void;
  currentPassword?: string;
};

export default function NewPasswordStep({
  onSuccess,
  currentPassword,
}: NewPasswordStepProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(confirmNewPasswordSchema),
    defaultValues: {},
  });

  const { user } = useUser();
  const userId = user?.id;
  const hasPassword = user?.passwordEnabled;

  async function onSubmit(data: z.infer<typeof confirmNewPasswordSchema>) {
    if (!userId || hasPassword === undefined) return;
    try {
      await updatePassword({
        data: {
          hasPassword,
          userId,
          currentPassword,
          newPassword: data.newPassword,
        },
      });
      toast.success(
        `Password ${hasPassword ? "updated" : "created"} successfully`,
      );
      onSuccess();
    } catch (error) {
      console.log("SFsgsgf", error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Unknown error occurred");
      throw new Error("Unknown error occurred");
    }
  }

  return (
    <>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Password</DialogTitle>
          <DialogDescription>Enter your new password below.</DialogDescription>
        </DialogHeader>
        <Separator />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 pt-2.5"
        >
          <InputField
            name="newPassword"
            control={control}
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            className="h-12 rounded-[6px]"
          />

          <InputField
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
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
    </>
  );
}
