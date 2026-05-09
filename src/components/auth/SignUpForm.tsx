import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import type { SignupFormType, UseSignUpProps } from "#/lib/types";
import { GoogleOneTap } from "@clerk/tanstack-react-start";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SocialAuthButtons from "./SocialAuthButtons";
import InputField from "../common/InputField";
import { signUpSchema } from "#/lib/schemas";

export default function SignUpForm({ signUp, fetchStatus }: UseSignUpProps) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
  });

  async function onsubmit(data: SignupFormType) {
    await signUp.reset();
    const { error } = await signUp.password({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.email,
      password: data.password,
      legalAccepted: data.termsAndConditions,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      toast.error(sendError.message);
    }
  }

  return (
    <>
      <div>
        <div className="mb-12 space-y-4">
          <h3 className="text-[40px] leading-none font-bold">Sign up</h3>
          <span className="text-[#546869]">
            Let’s get you all st up so you can access your personal account.
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex items-center gap-6">
            <InputField
              name="firstName"
              control={control}
              label="First Name"
              placeholder="First name"
            />

            <InputField
              name="lastName"
              control={control}
              label="Last Name"
              placeholder="Last name"
            />
          </div>

          <div className="flex items-center gap-6">
            <InputField
              name="email"
              control={control}
              label="Email Address"
              placeholder="john.doe@gmail.com"
              type="email"
            />

            <InputField
              name="phoneNumber"
              control={control}
              label="Phone Number"
              placeholder="Phone Number"
              type="number"
            />
          </div>

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

          <Controller
            name="termsAndConditions"
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
                    className="text-sm text-black"
                  >
                    I agree to all the{" "}
                    <Link to="/" className="text-salmon font-semibold">
                      Terms
                    </Link>
                    and
                    <Link to="/" className="text-salmon font-semibold">
                      Privacy Policies
                    </Link>
                  </FieldLabel>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <GoogleOneTap />
          <div id="clerk-captcha" />

          <Button type="submit" className="mt-4 h-12 w-full">
            {fetchStatus === "fetching" ? (
              <p className="flex items-center gap-2">
                Creating account...
                <Loader2 className="size-4 animate-spin" />
              </p>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="space-y-10">
          <p className="mx-auto mt-4 text-center text-sm font-medium">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-salmon font-semibold">
              Login
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <div className="bg-foreground/25 h-0.25 w-full"></div>
            <p className="text-foreground/50 text-center text-sm text-nowrap">
              Or Sign up with{" "}
            </p>
            <div className="bg-foreground/25 h-0.25 w-full"></div>
          </div>

          <SocialAuthButtons />
        </div>
      </div>
    </>
  );
}
