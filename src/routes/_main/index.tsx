import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import Herosection from "#/components/layout/Herosection";
import { hotelSearchWidgetSchema } from "#/lib/schemas";
import { createFileRoute } from "@tanstack/react-router";

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
