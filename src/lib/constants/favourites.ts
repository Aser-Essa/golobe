import type { FilterSearchParams } from "../types";

export const FAVOURITE_TYPES: {
  value: FilterSearchParams["favType"];
  label: string;
}[] = [
  {
    value: "hotel",
    label: "Hotels",
  },
  {
    value: "flight",
    label: "Flights",
  },
];
