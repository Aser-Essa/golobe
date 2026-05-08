import Herosection from "#/components/sections/Herosection";
import HotelSearchWidget from "#/components/sections/HotelSearchWidget";
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
