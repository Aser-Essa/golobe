import type { PaymentCardType } from "#/lib/types";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import DeletePaymentMethod from "./DeletePaymentMethod";

type CreditCardProps = {
  card: PaymentCardType["cards"][number]["card"];
  paymentMethodId: string;
};

export default function UserPaymentMethod({
  card,
  paymentMethodId,
}: CreditCardProps) {
  return (
    <div className="bg-primary flex h-53 w-full flex-col justify-between rounded-[16px] p-4">
      <div className="flex items-start justify-between">
        <div className="-space-y-2.5">
          <p className="text-2xl font-semibold">**** **** ****</p>
          <p className="text-[32px] font-semibold">{card?.last4}</p>
        </div>
        <DeletePaymentMethod paymentMethodId={paymentMethodId} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium">Valid Thru</p>
          <p className="text-xl font-semibold">
            {card?.exp_month}/{String(card?.exp_year).slice(2)}
          </p>
        </div>
        <PaymentIcon
          type={(card?.brand || "Visa") as any}
          format="mono"
          width={52}
          className="[&>path]:fill-black"
        />
      </div>
    </div>
  );
}
