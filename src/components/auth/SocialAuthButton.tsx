import { useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import { useState } from "react";

type SocialSignUpProps = {
  strategy: "oauth_google" | "oauth_facebook";
  children: React.ReactNode;
  mode: "signup" | "signin";
};

export function SocialAuthButton({
  strategy,
  mode,
  children,
}: SocialSignUpProps) {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const action = mode === "signup" ? signUp : signIn;

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    await action.reset();

    if (loading) return;
    setLoading(true);
    try {
      await action.sso({
        strategy,
        redirectUrl: "/",
        redirectCallbackUrl: "/",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all"
    >
      {children}
    </button>
  );
}
