import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";

type HotelBreadCrumbProps = { name: string; city: string; country: string };

export default function HotelBreadCrumb({
  name,
  city,
  country,
}: HotelBreadCrumbProps) {
  return (
    <>
      <Breadcrumb className="font-medium">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/hotels"
                className="text-salmon"
                search={{
                  destination: country,
                }}
              >
                {country}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/hotels"
                className="text-salmon"
                search={{
                  destination: city,
                }}
              >
                {city}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
