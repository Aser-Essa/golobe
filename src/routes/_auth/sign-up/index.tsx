import SignUpForm from "#/components/auth/SignUpForm";
import SignUpVerifyForm from "#/components/auth/SignUpVerifyForm";
import { useSignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/sign-up/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signUp, fetchStatus } = useSignUp();

  useEffect(() => {
    signUp.reset();
  }, []);

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return <SignUpVerifyForm signUp={signUp} fetchStatus={fetchStatus} />;
  }

  return <SignUpForm signUp={signUp} fetchStatus={fetchStatus} />;
}
