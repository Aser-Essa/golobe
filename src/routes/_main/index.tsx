import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import Container from "#/components/layout/Container";
import Herosection from "#/components/layout/Herosection";
import type { FilterSearchParams } from "#/lib/types";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getOrCreateStripeCustomer } from "#/server/stripe";
import { useUser } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
  const searchParams: FilterSearchParams = Route.useSearch();
  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    getOrCreateStripeCustomer({
      data: {
        name: user.fullName!,
        email: user.primaryEmailAddress?.emailAddress || "",
      },
    });
  }, [user]);

  return (
    <div className="mt-22">
      <Herosection />
      <Container className="mt-0">
        <HotelSearchWidget searchParams={normalizedSearchParams} />
      </Container>
      <div className="h-screen"></div>
    </div>
  );
}
