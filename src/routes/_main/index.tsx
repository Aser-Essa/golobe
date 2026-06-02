import Container from "#/components/layout/Container";
import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import Herosection from "#/components/layout/Herosection";
import type { FilterSearchParams } from "#/lib/types";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
  const searchParams: FilterSearchParams = Route.useSearch();

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

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
