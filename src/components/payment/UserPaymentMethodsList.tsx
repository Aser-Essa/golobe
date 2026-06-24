import type { PaymentCardType } from "#/lib/types";
import UserPaymentMethod from "./UserPaymentMethod";
import AddCardDialog from "#/components/payment/AddCardDialog";
import AddCardSquareButton from "#/components/payment/AddCardSquareButton";

type CardsListProps = {
  cards: PaymentCardType["cards"];
};

export default function UserPaymentMethodsList({ cards }: CardsListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <UserPaymentMethod card={card.card} paymentMethodId={card.id} />
      ))}
      <div className="h-53 w-full">
        <AddCardDialog addCardButton={<AddCardSquareButton />} />
      </div>
    </div>
  );
}
