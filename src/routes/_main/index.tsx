import Container from "#/components/common/Container";
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
    <>
      <Herosection />
      <Container>
        <HotelSearchWidget searchParams={normalizedSearchParams} />
        <div className="h-screen"></div>
      </Container>
    </>
  );
}
