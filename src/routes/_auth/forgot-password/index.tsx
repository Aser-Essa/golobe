import ForgotPasswordForm from "#/components/auth/ForgotPasswordForm";
import ForgotPasswordVerifyForm from "#/components/auth/ForgotPasswordVerifyForm";
import ResetPasswordForm from "#/components/auth/ResetPasswordForm";
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

  if (signIn.status === "needs_first_factor") {
    return (
      <ForgotPasswordVerifyForm
        sendEmailCode={sendEmailCode}
        fetchStatus={fetchStatus}
        signIn={signIn}
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
