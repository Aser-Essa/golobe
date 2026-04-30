import VerifyForm from "#/components/main/auth/VerifyForm";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import type { UseSignUpProps } from "#/lib/types";

export default function SignUpVerifyForm({
  signUp,
  fetchStatus,
}: UseSignUpProps) {
  const router = useRouter();

  const handleVerify = async ({ code }: { code: string }) => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (error) {
      toast.error(error.message);
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session.currentTask);
            toast.error("Sign up attempt not complete");
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.navigate({ to: url });
          }
        },
      });
    } else {
      toast.error("Sign up attempt not complete");
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  return (
    <>
      <VerifyForm
        handleVerify={handleVerify}
        sendEmailCode={signUp.verifications.sendEmailCode}
        fetchStatus={fetchStatus}
      />
    </>
  );
}
