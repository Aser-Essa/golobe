import FavouriteList from "#/components/favourites/FavouriteList";
import FavouriteTypeFilter from "#/components/favourites/FavouriteTypeFilter";
import Container from "#/components/layout/Container";
import HotelsListSkeleton from "#/components/skeleton/HotelsListSkeleton";
import TypeFilterSkeleton from "#/components/skeleton/TypeFilterSkeleton";
import { FAVOURITE_TYPES } from "#/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";

export const Route = createFileRoute("/_main/_protected/favourites/")({
  component: RouteComponent,
  validateSearch: z.object({
    favType: z.enum(["hotel", "flight"]).default("hotel"),
  }),
});

function RouteComponent() {
  const { favType } = Route.useSearch();

  return (
    <Container>
      <h3 className="text-[32px] font-bold">Favourites</h3>

      <Suspense
        fallback={
          <div className="mt-6">
            <TypeFilterSkeleton TYPES_TABS={FAVOURITE_TYPES} />
          </div>
        }
      >
        <FavouriteTypeFilter />
      </Suspense>

      <div className="mt-10">
        <Suspense fallback={<HotelsListSkeleton />}>
          <FavouriteList favType={favType} />
        </Suspense>
      </div>
    </Container>
  );
}
