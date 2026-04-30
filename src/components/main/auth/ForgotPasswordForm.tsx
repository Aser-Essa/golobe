import { SocialAuthButton } from "#/components/main/auth/SocialAuthButton";
import { Button } from "#/components/ui/button";
import { forgotPasswordSchema } from "#/lib/schemas";
import type {
  ForgotPasswordFormProps,
  ForgotPasswordFormType,
} from "#/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../InputField";

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
          <InputField
            name="email"
            control={control}
            label="Email Address"
            placeholder="john.doe@gmail.com"
            type="email"
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
            <SocialAuthButton strategy="oauth_facebook">
              <img src="/facebook.svg" alt="facebook" className="size-6" />
            </SocialAuthButton>

            <SocialAuthButton strategy="oauth_google">
              <img src="/google.svg" alt="google" className="size-6" />
            </SocialAuthButton>

            <div className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all">
              <img src="/apple.svg" alt="apple" className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
