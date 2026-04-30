import { SocialSignUpButton } from "#/components/main/auth/SocialSignUpButton";
import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { forgotPasswordSchema } from "#/lib/schemas";
import type {
  ForgotPasswordFormProps,
  ForgotPasswordFormType,
} from "#/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordForm({
  fetchStatus,
  signIn,
  sendEmailCode,
}: ForgotPasswordFormProps) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onsubmit(data: ForgotPasswordFormType) {
    const { error } = await signIn.create({
      identifier: data.email,
    });

    if (error) {
      toast.error(error.message);
    }

    await sendEmailCode();
  }

  return (
    <>
      <div>
        <div className="mb-12 space-y-4">
          <h3 className="text-[40px] leading-none font-bold">
            Forgot your password?
          </h3>
          <span className="text-[#546869]">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <Controller
            name="email"
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
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="john.doe@gmail.com"
                  className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="mt-4 h-12 w-full">
            {fetchStatus === "fetching" ? (
              <p className="flex items-center gap-2">
                Submitting...
                <Loader2 className="size-4 animate-spin" />
              </p>
            ) : (
              "Submit"
            )}
          </Button>
        </form>

        <div>
          <div className="my-10 flex items-center gap-4">
            <div className="bg-foreground/25 h-0.25 w-full"></div>
            <p className="text-foreground/50 text-center text-sm text-nowrap">
              Or login with
            </p>
            <div className="bg-foreground/25 h-0.25 w-full"></div>
          </div>

          <div className="flex items-center gap-4">
            <SocialSignUpButton strategy="oauth_facebook">
              <img src="/facebook.svg" alt="facebook" className="size-6" />
            </SocialSignUpButton>

            <SocialSignUpButton strategy="oauth_google">
              <img src="/google.svg" alt="google" className="size-6" />
            </SocialSignUpButton>

            <div className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all">
              <img src="/apple.svg" alt="apple" className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
