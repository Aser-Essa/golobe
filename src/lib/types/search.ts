import type z from "zod";
import type {
  filterAvailableRoomsWidgetSchema,
  filterSearchParamsSchema,
  hotelSearchWidgetSchema,
} from "../schemas/search";

export type HotelSearchWidgetType = z.infer<typeof hotelSearchWidgetSchema>;

export type searchDestinationsType = {
  city: string;
  country: string;
  address: string;
  name: string;
}[];

export type FilterSearchParams = z.infer<typeof filterSearchParamsSchema>;

export type FilterAvailableRoomsWidgetType = z.infer<
  typeof filterAvailableRoomsWidgetSchema
>;

export type SidebarFilterOptions = {
  max_price: number;
  amenities: string[];
  freebies: string[];
};
