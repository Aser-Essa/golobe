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
} from "#/components/ui/pagination";
import { useSearch } from "@tanstack/react-router";

export function ReviewsPagination({ totalPages = 1 }: { totalPages: number }) {
  const { reviews_page }: { reviews_page: number } = useSearch({
    from: "/_main/hotels/$hotelId/",
  });
  const windowSize = Math.min(4, totalPages);

  const pages = generatePageButtons({
    page: reviews_page,
    totalPages,
    windowSize,
  });

  const toPage = (n: number) => (prev: FilterSearchParams) =>
    ({
      ...prev,
      reviews_page: n,
    }) as never;

  if (pages.length <= 1) return;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={reviews_page <= 1}
            search={toPage(reviews_page - 1)}
            resetScroll={false}
          />
        </PaginationItem>

        {pages.map((pg, index) => (
          <PaginationItem key={`${pg}-${index}`}>
            {pg === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={pg === reviews_page}
                search={toPage(pg)}
                resetScroll={false}
              >
                {pg}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={reviews_page >= totalPages}
            search={toPage(reviews_page + 1)}
            resetScroll={false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
