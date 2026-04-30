import { createFileRoute } from "@tanstack/react-router";

import SignInForm from "#/components/main/auth/SignInForm";
import { useSignIn } from "@clerk/tanstack-react-start";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn, fetchStatus } = useSignIn();

  useEffect(() => {
    signIn.reset();
  }, []);

  return <SignInForm signIn={signIn} fetchStatus={fetchStatus} />;
}
