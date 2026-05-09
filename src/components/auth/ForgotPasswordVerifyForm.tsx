import type { ForgotPasswordFormProps } from "#/lib/types";
import { toast } from "sonner";
import VerifyForm from "./VerifyForm";

export default function ForgotPasswordVerifyForm({
  sendEmailCode,
  fetchStatus,
  signIn,
}: ForgotPasswordFormProps) {
  async function handleVerify(data: { code: string }) {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: data.code,
    });

    if (error) {
      toast.error(error.message);
      await sendEmailCode();
    }
  }

  return (
    <>
      <VerifyForm
        handleVerify={handleVerify}
        sendEmailCode={sendEmailCode}
        fetchStatus={fetchStatus}
      />
    </>
  );
}
