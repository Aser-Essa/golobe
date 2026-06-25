import UserPaymentMethodsList from "#/components/payment/UserPaymentMethodsList";
import { UserPaymentMethodsListSkeleton } from "#/components/skeleton/UserPaymentMethodsListSkeleton";
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
      <div className="box-shadow-sm flex flex-wrap items-center gap-6 rounded-[16px] bg-white p-4 md:px-6 md:py-8">
        <Await
          promise={cardsPromise}
          fallback={<UserPaymentMethodsListSkeleton />}
        >
          {(cards) => <UserPaymentMethodsList cards={cards.cards} />}
        </Await>
      </div>

    </div>
  );
}
