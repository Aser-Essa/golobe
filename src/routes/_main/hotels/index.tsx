import Container from "#/components/layout/Container";
import RouteError from "#/components/common/RouteError";
import { FilterSidebarSheet } from "#/components/hotels/Filters/FilterSidebarSheet";
import HotelFilterSidebar from "#/components/hotels/Filters/HotelFilterSidebar";
import HotelSearchBar from "#/components/hotels/Filters/HotelSearchBar";
import HotelTypeFilter from "#/components/hotels/Filters/HotelTypeFilter";
import { HotelPagination } from "#/components/hotels/HotelPagination";
import HotelsEmptyState from "#/components/hotels/HotelsEmptyState";
import HotelsList from "#/components/hotels/HotelsList";
import HotelSortBy from "#/components/hotels/HotelSortBy";
import HotelsPageSkeleton from "#/components/skeleton/HotelsPageSkeleton";
import PaginationResultsSummary from "#/components/hotels/PaginationResultsSummary";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { filterSearchParamsSchema } from "#/lib/schemas/search";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getFilterOptions, getHotels } from "#/server/hotels";
import { Await, createFileRoute, redirect } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_main/hotels/")({
  component: RouteComponent,
  validateSearch: filterSearchParamsSchema,
  loaderDeps: ({ search }) => search,
  beforeLoad: ({ search }) => {
    if (!search.destination || search.destination.trim().length === 0) {
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ deps }) => {
    const hotelsPromise = getHotels({ data: deps });
    const SidebarFilterOptions = await getFilterOptions();
    return { hotelsPromise, SidebarFilterOptions };
  },
  errorComponent: ({ error, reset }) => (
    <RouteError error={error} reset={reset} />
  ),
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const { hotelsPromise, SidebarFilterOptions } = Route.useLoaderData();

  return (
    <Container>
      <div className="box-shadow-sm z-50 space-y-8 rounded-[16px] bg-white px-6 py-8">
        <HotelSearchBar
          searchParams={normalizedSearchParams}
          className="flex-col gap-2 lg:flex-row lg:items-end"
          submitButton={
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                className="flex aspect-square h-14 w-full flex-1 items-center gap-1 px-4 py-2 text-sm font-medium lg:w-fit"
              >
                <Search className="size-5" />
              </Button>
              <div className="flex w-full flex-1 xl:hidden">
                <FilterSidebarSheet
                  SidebarFilterOptions={SidebarFilterOptions}
                />
              </div>
            </div>
          }
        />
      </div>

      <div className="mt-8 flex items-start gap-6">
        <div className="hidden xl:block">
          <HotelFilterSidebar SidebarFilterOptions={SidebarFilterOptions} />
        </div>
        <Separator orientation="vertical" className="hidden xl:block" />

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
    </Container>
  );
}
