import { Button } from "#/components/ui/button";
import { forgotPasswordSchema } from "#/lib/schemas";
import type {
  ForgotPasswordFormProps,
  ForgotPasswordFormType,
} from "#/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../common/InputField";
import SocialAuthButtons from "./SocialAuthButtons";
import { Link } from "@tanstack/react-router";

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

  async function onSubmit(data: ForgotPasswordFormType) {
    const { error } = await signIn.create({
      identifier: data.email,
    });

    if (error) {
      toast.error(error.message);
    }

    await sendEmailCode();
  }

  return (
    <div>
      <div className="mb-12 space-y-4">
        <Link to="/sign-in" className="flex items-center gap-1">
          <ChevronLeft />
          <p>Back to login</p>
        </Link>
        <h3 className="font-trade-gothic text-[40px] leading-none font-bold ">
          Forgot your password?
        </h3>
        <span className="text-[#546869]">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password
        </span>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

        <SocialAuthButtons mode="signin" />
      </div>
    </div>
  );
}
