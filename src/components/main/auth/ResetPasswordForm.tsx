import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { resetPasswordSchema } from "#/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import type { ResetPasswordFormType } from "#/lib/types";
import { useSignIn } from "@clerk/tanstack-react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const { signIn, fetchStatus } = useSignIn();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onsubmit(data: ResetPasswordFormType) {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
    }
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
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="relative w-full"
            >
              <FieldLabel
                htmlFor={field.name}
                className="absolute -top-2.25 left-3 w-fit! bg-white px-1 text-sm font-normal"
              >
                Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="password"
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="relative w-full"
            >
              <FieldLabel
                htmlFor={field.name}
                className="absolute -top-2.25 left-3 w-fit! bg-white px-1 text-sm font-normal"
              >
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="confirm password"
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
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
