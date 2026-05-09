import { Button } from "#/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ResetPasswordFormType } from "#/lib/types";
import { useSignIn } from "@clerk/tanstack-react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { resetPasswordSchema } from "#/lib/schemas";
import InputField from "../common/InputField";

export default function ResetPasswordForm() {
  const { signIn, fetchStatus } = useSignIn();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  async function onsubmit(data: ResetPasswordFormType) {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset successfully");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.navigate({ to: "/", reloadDocument: true });
  }

  return (
    <div>
      <div className="mb-12 space-y-4">
        <h3 className="text-[40px] leading-none font-bold">Set a password</h3>
        <span className="text-[#546869]">
          Your previous password has been reseted. Please set a new password for
          your account.
        </span>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
        <InputField
          name="password"
          control={control}
          label="Password"
          placeholder="Password"
          type="password"
        />

        <InputField
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
        />

        <Button type="submit" className="mt-4 h-12 w-full">
          {fetchStatus === "fetching" ? (
            <p className="flex items-center gap-2">
              Setting new password...
              <Loader2 className="size-4 animate-spin" />
            </p>
          ) : (
            "Set Password"
          )}
        </Button>
      </form>
    </div>
  );
}
