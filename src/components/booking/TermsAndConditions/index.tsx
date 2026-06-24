import ContactUs from "./ContactUs";
import PaymentTerms from "./PaymentTerms";

export default function TermsAndConditions() {
  return (
    <div className="mt-16 space-y-8.5">
      <p className="text-2xl font-semibold">Terms and Conditions</p>
      <PaymentTerms />
      <ContactUs />
    </div>
  );
}
