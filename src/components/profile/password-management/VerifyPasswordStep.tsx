import InputField from "#/components/common/InputField";
import { Button } from "#/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Separator } from "#/components/ui/separator";
import { passwordSchema } from "#/lib/schemas/user";
import { verifyPassword } from "#/server/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface VerifyPasswordStepProps {
  setIsVerified: (value: boolean) => void;
  setCurrentPassword: (value: string) => void;
}

export default function VerifyPasswordStep({
  setIsVerified,
  setCurrentPassword,
}: VerifyPasswordStepProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        currentPassword: passwordSchema,
      }),
    ),
    defaultValues: {
      currentPassword: "",
    },
  });

  async function onSubmit(data: {
    currentPassword: z.infer<typeof passwordSchema>;
  }) {
    try {
      await verifyPassword({
        data: { currentPassword: data.currentPassword },
      });
      toast.success("Password verified successfully");
      setCurrentPassword(data.currentPassword);
      setIsVerified(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Unknown error occurred");
      throw new Error("Unknown error occurred");
    }
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Verify Current Password</DialogTitle>
        <DialogDescription>
          Enter your current password below.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 pt-2.5"
      >
        <InputField
          name="currentPassword"
          control={control}
          label="Current Password"
          placeholder="Enter your current password"
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
  );
}
