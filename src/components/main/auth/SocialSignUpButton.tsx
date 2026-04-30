import { useSignUp } from "@clerk/tanstack-react-start";
import { useState } from "react";

type SocialSignUpProps = {
  strategy: "oauth_google" | "oauth_facebook";
  children: React.ReactNode;
};

export function SocialSignUpButton({ strategy, children }: SocialSignUpProps) {
  const { signUp } = useSignUp();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    await signUp.reset();

    if (loading) return;
    setLoading(true);
    try {
      await signUp.sso({
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
    <div
      onClick={handleClick}
      className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all"
    >
      {children}
    </div>
  );
}
