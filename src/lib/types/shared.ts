export type PageButtonItem = number | "...";

export type GeneratePageButtonsParams = {
  page: number;
  totalPages: number;
  windowSize: number;
};

export type GetPaginationRangeParams = {
  page: number;
  totalItems: number;
  perPage: number;
};
