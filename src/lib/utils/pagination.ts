import type {
    GeneratePageButtonsParams,
    GetPaginationRangeParams,
    PageButtonItem,
} from "../types";

export function getPaginationRange({
  page,
  totalItems,
  perPage,
}: GetPaginationRangeParams) {
  const totalPages = Math.ceil(totalItems / perPage);
  const safePage = Math.max(1, Math.min(page, totalPages));
  const from = (safePage - 1) * perPage;
  const to = Math.min(safePage * perPage, totalItems);
  return { from, to, totalPages };
}

export function generatePageButtons({
  page,
  totalPages,
  windowSize,
}: GeneratePageButtonsParams): PageButtonItem[] {
  const windowEnd = Math.min(
    totalPages,
    windowSize * Math.ceil(page / windowSize),
  );
  const windowStart = windowEnd - windowSize + 1;

  let pages: PageButtonItem[] = Array.from(
    { length: windowSize },
    (_, i) => i + windowStart,
  );

  if (windowEnd < totalPages) pages = [...pages, "...", totalPages];
  if (windowStart > 1) pages = [1, "...", ...pages];

  return pages;
}