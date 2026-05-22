import HotelFilterSidebar from "#/components/hotels/Filters/HotelFilterSidebar";
import HotelSearchBar from "#/components/hotels/Filters/HotelSearchBar";
import HotelTypeFilter from "#/components/hotels/Filters/HotelTypeFilter";
import { HotelPagination } from "#/components/hotels/HotelPagination";
import HotelsEmptyState from "#/components/hotels/HotelsEmptyState";
import HotelsList from "#/components/hotels/HotelsList";
import HotelSortBy from "#/components/hotels/HotelSortBy";
import HotelsPageSkeleton from "#/components/hotels/HotelsPageSkeleton";
import PaginationResultsSummary from "#/components/hotels/PaginationResultsSummary";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { filterSearchParamsSchema } from "#/lib/schemas/search";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getFilterOptions, getHotels } from "#/server/hotels";
import { Await, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_main/hotels/")({
  component: RouteComponent,
  validateSearch: filterSearchParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const hotelsPromise = getHotels({ data: deps });
    const SidebarFilterOptions = await getFilterOptions();
    return { hotelsPromise, SidebarFilterOptions };
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const { hotelsPromise, SidebarFilterOptions } = Route.useLoaderData();

  return (
    <>
      <div className="box-shadow-sm z-50 space-y-8 rounded-[16px] bg-white px-6 py-8">
        <HotelSearchBar
          searchParams={normalizedSearchParams}
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
        <HotelFilterSidebar SidebarFilterOptions={SidebarFilterOptions} />
        <Separator orientation="vertical" />

        <Await promise={hotelsPromise} fallback={<HotelsPageSkeleton />}>
          {(data) => (
            <div className="w-full space-y-8">
              <HotelTypeFilter typePlaceCounts={data.typePlaceCounts} />
              <div className="flex items-center justify-between text-sm">
                <PaginationResultsSummary
                  totalCount={data.totalLength}
                  from={data.from}
                  to={data.to}
                />
                <HotelSortBy />
              </div>
              {data.hotels.length > 0 ? (
                <HotelsList hotels={data.hotels} />
              ) : (
                <HotelsEmptyState />
              )}

              <HotelPagination totalPages={data.totalPages} />
            </div>
          )}
        </Await>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
