import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "#/components/ui/field";
import { RadioGroupItem } from "#/components/ui/radio-group";
import { useCards } from "#/hooks/useCards";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import PaymentCardsSkeleton from "../skeleton/PaymentCardsSkeleton";

export default function SelectPaymentCard() {
  const { cards, loading } = useCards();

  if (loading) return <PaymentCardsSkeleton />;

  return (
    <>
      {cards.map((card) => (
        <FieldLabel
          htmlFor={card.id}
          key={card.id}
          className="has-data-checked:bg-primary flex h-20 flex-col justify-center"
        >
          <Field orientation="horizontal">
            <FieldContent className="space-y-2">
              <FieldTitle className="flex gap-8 text-base font-bold">
                <PaymentIcon
                  type={card.card.brand}
                  format="mono"
                  width={32}
                  className="[&>path]:fill-black"
                />
                <div className="flex items-center gap-2">
                  <p className="text-base font-trade-gothic">**** {card.card.last4}</p>
                  <p className="text-sm font-normal ">
                    {card.card.exp_month}/{String(card.card.exp_year).slice(2)}
                  </p>
                </div>
              </FieldTitle>
            </FieldContent>
            <RadioGroupItem value={card.id} id={card.id} />
          </Field>
        </FieldLabel>
      ))}
    </>
  );
}
