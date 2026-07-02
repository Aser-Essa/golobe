import { paymentTerms } from "#/lib/constants";

export default function PaymentTerms() {
  return (
    <div className="space-y-4">
      <p className="text-xl font-medium ">Payments</p>
      <ul className="space-y-4">
        {paymentTerms.map((term, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-base leading-none">.</span>
            <p className="text-sm">{term}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
