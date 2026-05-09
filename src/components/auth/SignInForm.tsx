import { Button, buttonVariants } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";

import { signInSchema } from "#/lib/schemas";
import type { SignInFormType, UseSignInProps } from "#/lib/types";
import { cn } from "#/lib/utils";
import { GoogleOneTap } from "@clerk/tanstack-react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import SocialAuthButtons from "./SocialAuthButtons";
import InputField from "../common/InputField";

export default function SignInForm({ signIn, fetchStatus }: UseSignInProps) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const navigate = useNavigate();

  async function onsubmit(data: SignInFormType) {
    await signIn.reset();

    const { error } = await signIn.password({
      emailAddress: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("You have successfully logged in");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate({ to: "/", reloadDocument: true });
  }

  return (
    <>
      <div>
        <div className="mb-12 space-y-4">
          <h3 className="text-[40px] leading-none font-bold">Login</h3>
          <span className="text-[#546869]">
            Login to access your Golobe account
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <InputField
            label=" Email Address"
            control={control}
            name="email"
            placeholder="john.doe@gmail.com"
            type="email"
          />

          <InputField
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            type="password"
          />

          <div className="flex h-6 items-center justify-between">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="relative flex w-full items-center"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      ref={field.ref}
                      className="aspect-square! h-4.5! w-4.5!"
                    />
                    <FieldLabel
                      htmlFor={field.name}
                      className="w-full text-sm whitespace-nowrap text-black"
                    >
                      Remember me
                    </FieldLabel>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Link
              to="/forgot-password"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-salmon text-sm font-semibold",
              )}
            >
              Forgot Password
            </Link>
          </div>

          <GoogleOneTap />
          <div id="clerk-captcha" />

          <Button type="submit" className="mt-4 h-12 w-full">
            {fetchStatus === "fetching" ? (
              <p className="flex items-center gap-2">
                Logging in...
                <Loader2 className="size-4 animate-spin" />
              </p>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="space-y-10">
          <p className="mx-auto mt-4 text-center text-sm font-medium">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-salmon font-semibold">
              Sign up
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <div className="bg-foreground/25 h-0.25 w-full"></div>
            <p className="text-foreground/50 text-center text-sm text-nowrap">
              Or login with
            </p>
            <div className="bg-foreground/25 h-0.25 w-full"></div>
          </div>

          <SocialAuthButtons />
        </div>
      </div>
    </>
  );
}
