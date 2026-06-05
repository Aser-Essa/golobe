import { useState } from "react";
import NewPasswordStep from "./NewPasswordStep";
import VerifyPasswordStep from "./VerifyPasswordStep";

export default function UpdatePasswordForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isVerified, setIsVerified] = useState(false);
  const [currentPassword , setCurrentPassword] = useState("");

  return (
    <>
      {isVerified ? (
        <NewPasswordStep onSuccess={onSuccess} currentPassword={currentPassword} />
      ) : (
        <VerifyPasswordStep setIsVerified={setIsVerified} setCurrentPassword={setCurrentPassword} />
      )}
    </>
  );
}
