import ForgotPasswordForm from "#/components/main/auth/ForgotPasswordForm";
import ResetPasswordForm from "#/components/main/auth/ResetPasswordForm";
import VerifyForm from "#/components/main/auth/VerifyForm";
import { useSignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/forgot-password/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn, fetchStatus } = useSignIn();

  async function sendEmailCode() {
    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();

    if (sendCodeError) {
      toast.error(sendCodeError.message);
    }
  }

  async function handleVerify(data: { code: string }) {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: data.code,
    });

    if (error) {
      toast.error(error.message);
      await sendEmailCode();
    }
  }

  if (signIn.status === "needs_first_factor") {
    return (
      <VerifyForm
        handleVerify={handleVerify}
        sendEmailCode={sendEmailCode}
        fetchStatus={fetchStatus}
      />
    );
  }

  if (signIn.status === "needs_new_password") {
    return <ResetPasswordForm />;
  }

  return (
    <ForgotPasswordForm
      fetchStatus={fetchStatus}
      signIn={signIn}
      sendEmailCode={sendEmailCode}
    />
  );
}
