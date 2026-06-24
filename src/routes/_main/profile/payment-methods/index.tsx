import UserPaymentMethodsList from "#/components/payment/UserPaymentMethodsList";
import { getCards } from "#/server/stripe";
import { Await, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile/payment-methods/")({
  component: RouteComponent,

  loader: async () => {
    const cardsPromise = getCards();
    return { cardsPromise };
  },
});

function RouteComponent() {
  const { cardsPromise } = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <h3 className="text-[28px] font-bold sm:text-[32px]">Payment methods</h3>
      <div className="box-shadow-sm flex flex-wrap items-center gap-6 rounded-[16px] bg-white px-6 py-8">
        <Await promise={cardsPromise} fallback={<p>Loading...</p>}>
          {(cards) => <UserPaymentMethodsList cards={cards.cards} />}
        </Await>
      </div>

      <div className="h-screen"></div>
    </div>
  );
}
