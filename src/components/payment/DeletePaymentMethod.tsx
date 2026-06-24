import { deletePaymentMethod } from "#/server/stripe";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export default function DeletePaymentMethod({
  paymentMethodId,
}: {
  paymentMethodId: string;
}) {
  const navigate = useNavigate();

  async function handleDelete() {
    const { success, error } = await deletePaymentMethod({
      data: { paymentMethodId },
    });

    if (success) {
      toast.success("Payment method deleted successfully");
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate({ reloadDocument: true, resetScroll: false });
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
