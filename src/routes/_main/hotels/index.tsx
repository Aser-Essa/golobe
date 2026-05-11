import HotelFilterSidebar from "#/components/hotels/Filters/HotelFilterSidebar";
import HotelSearchBar from "#/components/hotels/Filters/HotelSearchBar";
import HotelTypeFilter from "#/components/hotels/Filters/HotelTypeFilter";
import { HotelPagination } from "#/components/hotels/HotelPagination";
import HotelsList from "#/components/hotels/HotelsList";
import HotelSortBy from "#/components/hotels/HotelSortBy";
import PaginationResultsSummary from "#/components/hotels/PaginationResultsSummary";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { filterSearchParamsSchema } from "#/lib/schemas/search";
import { getHotels } from "#/server/hotels";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_main/hotels/")({
  component: RouteComponent,
  validateSearch: filterSearchParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: searchFilters }) => getHotels({ data: searchFilters }),
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const { hotels, totalLength, totalPages, from, to, typePlaceCounts } =
    Route.useLoaderData();

  return (
    <>
      <div className="box-shadow-sm z-50 space-y-8 rounded-[16px] bg-white px-6 py-8">
        <HotelSearchBar
          searchParams={searchParams}
          className="gap-2"
          submitButton={
            <Button
              type="submit"
              className="flex aspect-square h-14 items-center gap-1 px-4 py-2 text-sm font-medium"
            >
              <Search className="size-5" />
            </Button>
          }
        />
      </div>

      <div className="mt-8 flex items-start gap-6">
        <HotelFilterSidebar />
        <Separator orientation="vertical" className="h-100" />
        <div className="w-full space-y-8">
          <HotelTypeFilter typePlaceCounts={typePlaceCounts} />
          <div className="flex items-center justify-between text-sm">
            <PaginationResultsSummary
              totalCount={totalLength}
              from={from}
              to={to}
            />
            <HotelSortBy />
          </div>
          <HotelsList hotels={hotels} />
          <HotelPagination totalPages={totalPages} />
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
