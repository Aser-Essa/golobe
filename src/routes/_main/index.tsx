import Herosection from "#/components/layout/Herosection";
import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
  const searchParams = Route.useSearch();

  return (
    <>
      <Herosection />
      <HotelSearchWidget searchParams={searchParams} />
      <div className="h-screen"></div>
    </>
  );
}
