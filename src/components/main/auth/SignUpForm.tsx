import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { signUpSchema } from "#/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { SocialSignUpButton } from "#/components/main/auth/SocialSignUpButton";
import type { SignupFormType, UseSignUpProps } from "#/lib/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GoogleOneTap } from "@clerk/tanstack-react-start";

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
            <Controller
              name="firstName"
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
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="First name"
                    className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
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
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Last name"
                    className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex items-center gap-6">
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

            <Controller
              name="phoneNumber"
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
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="phone number"
                    className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
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
