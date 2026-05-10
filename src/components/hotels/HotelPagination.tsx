import type { FilterSearchParams } from "#/lib/types";
import { generatePageButtons } from "#/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearch } from "@tanstack/react-router";

export function HotelPagination({ totalPages }: { totalPages: number }) {
  const { page }: FilterSearchParams = useSearch({ from: "/_main/hotels/" });
  const windowSize = Math.min(4, totalPages);

  const pages = generatePageButtons({ page, totalPages, windowSize });

  const toPage = (n: number) => (prev: FilterSearchParams) =>
    ({
      ...prev,
      page: n,
    }) as never;

  if (pages.length <= 1) return;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page <= 1} search={toPage(page - 1)} />
        </PaginationItem>

        {pages.map((pg, index) => (
          <PaginationItem key={`${pg}-${index}`}>
            {pg === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={pg === page} search={toPage(pg)}>
                {pg}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={page >= totalPages}
            search={toPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
