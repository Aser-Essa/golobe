import { createContext, useContext, useRef } from "react";

type PaymentContextType = {
  confirmPaymentRef: React.RefObject<
    (({ clientSecret }: { clientSecret: string }) => Promise<void>) | null
  >;
};

const CheckoutConfirmContext = createContext<PaymentContextType | null>(null);

export function CheckoutConfirmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const confirmPaymentRef = useRef<
    (({ clientSecret }: { clientSecret: string }) => Promise<void>) | null
  >(null);

  return (
    <CheckoutConfirmContext.Provider value={{ confirmPaymentRef }}>
      {children}
    </CheckoutConfirmContext.Provider>
  );
}

export function useCheckoutConfirm() {
  const ctx = useContext(CheckoutConfirmContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}
