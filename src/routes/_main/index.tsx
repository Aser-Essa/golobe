import Herosection from "#/components/layout/Herosection";
import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import { createFileRoute } from "@tanstack/react-router";
import { hotelSearchWidgetSchema } from "#/lib/schemas";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
  const searchParams = Route.useSearch();

  const parsedSearchParams = hotelSearchWidgetSchema.parse(searchParams);

  return (
    <>
      <Herosection />
      <HotelSearchWidget searchParams={parsedSearchParams} />
      <div className="h-screen"></div>
    </>
  );
}
