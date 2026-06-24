import { RadioGroup } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import OtherPaymentMethods from "./OtherPaymentMethods";
import PaymentCards from "./PaymentCards";

type PaymentMethodsProps = {
  selectedMethod: string;
  setSelectedMethod: (value: string) => void;
};

export default function SelectPaymentMethods({
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodsProps) {
  return (
    <RadioGroup
      className="gap-4"
      value={selectedMethod}
      onValueChange={setSelectedMethod}
    >
      <div className="box-shadow-sm space-y-6 rounded-[12px] bg-white p-4 sm:p-6">
        <PaymentCards selectedMethod={selectedMethod} />
        <Separator />
        <OtherPaymentMethods selected={selectedMethod === "other"} />
      </div>
    </RadioGroup>
  );
}
