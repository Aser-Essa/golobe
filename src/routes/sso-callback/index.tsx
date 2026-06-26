import { useClerk, useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/sso-callback/")({
  component: RouteComponent,
});

function RouteComponent() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const hasRun = useRef(false);

  useEffect(() => {
    async function handleCallback() {
      if (hasRun.current) return;
      hasRun.current = true;
      if (
        signUp.status === "missing_requirements" &&
        signUp.verifications.externalAccount.status === "transferable"
      ) {
        await signIn.create({ transfer: true });
      }

      await clerk.handleRedirectCallback({
        signInUrl: "/sign-in",
        signUpUrl: "/sign-up",
        signInFallbackRedirectUrl: "/",
        signUpFallbackRedirectUrl: "/",
      });
    }

    handleCallback().catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-0 font-sans">
      {/* icon */}
      <div className="relative mb-7 size-20">
        <div className="bg-primary/20 absolute inset-[-12px] animate-ping rounded-full" />
        <div className="border-t-primary border-r-primary/30 absolute inset-[-6px] animate-spin rounded-full border-[2.5px] border-transparent" />
        <div className="border-primary bg-card relative z-10 flex size-20 items-center justify-center rounded-full border">
          <ShieldCheck className="text-primary size-7" />
        </div>
      </div>

      {/* text */}
      <p className="text-foreground mb-1.5 text-lg font-semibold tracking-tight">
        Verifying your account
      </p>
      <p className="text-muted-foreground mb-8 text-sm">
        Hang tight — confirming your identity
      </p>

      {/* dots */}
      <div className="mb-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-primary size-[7px] animate-bounce rounded-full"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>

      {/* progress steps */}
      <div className="flex items-center gap-2">
        <div className="bg-secondary h-[3px] w-7 rounded-full" />
        <div className="bg-primary h-[3px] w-11 rounded-full" />
        <div className="bg-secondary h-[3px] w-7 rounded-full" />
      </div>
    </div>
  );
}
