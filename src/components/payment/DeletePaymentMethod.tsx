import { deletePaymentMethod } from "#/server/stripe";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export default function DeletePaymentMethod({
  paymentMethodId,
}: {
  paymentMethodId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const { success, error } = await deletePaymentMethod({
      data: { paymentMethodId },
    });

    if (success) {
      toast.success("Payment method deleted successfully");
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.invalidate();
    } else {
      toast.error(error || "Failed to delete payment method");
    }
  }

  return (
    <div onClick={handleDelete} className="cursor-pointer">
      <img src="/Bin.svg" />
    </div>
  );
}
