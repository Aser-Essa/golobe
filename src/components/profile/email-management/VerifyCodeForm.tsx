import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import type { EmailAddressResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import InputField from "../common/InputField";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type VerifyCodeFormProps = {
  emailObj: EmailAddressResource | undefined;
  onSuccess?: () => void;
};

export default function VerifyCodeForm({
  emailObj,
  onSuccess,
}: VerifyCodeFormProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        code: z.string().min(1, "Verification code is required"),
      }),
    ),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: { code: string }) {
    try {
      const emailVerifyAttempt = await emailObj?.attemptVerification({
        code: data.code,
      });
      if (emailVerifyAttempt?.verification.status === "verified") {
        toast.success("Email verified successfully");
        onSuccess?.();
      } else {
        toast.error("Email verification failed");
        return;
      }
    } catch (error) {
      toast.error("Email verification failed");
      console.error(error);
    }
  }

  async function resendVerificationCode() {
    try {
      await emailObj?.prepareVerification({
        strategy: "email_code",
      });
      toast.success("Verification code sent successfully");
    } catch (error) {
      toast.error("Failed to send verification code");
      console.error(error);
    }
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Verify email address</DialogTitle>
        <DialogDescription>
          Enter the verification code sent to{" "}
          {emailObj?.emailAddress ?? "your email address"}.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          name="code"
          control={control}
          label="Verification Code"
          placeholder="Enter your code"
          type="text"
          className="h-12 rounded-[6px]"
        />
        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={resendVerificationCode}
            className="flex-1"
          >
            Resend code
          </Button>
          <Button type="submit" className="flex-1">
            Verify
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
