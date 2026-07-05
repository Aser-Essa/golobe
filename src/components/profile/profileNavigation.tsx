import { useLocation, useNavigate } from "@tanstack/react-router";
import { TabFilter } from "../common/TabFilter";
import { useMediaQuery } from "react-responsive";

export default function profileNavigation() {
  const navigate = useNavigate({ from: "/profile/" });
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="mt-8">
      <TabFilter
        defaultValue={path || "account"}
        onValueChange={(value) =>
          navigate({
            to: `/profile/${value}`,
            resetScroll: false,
            viewTransition: true,
          })
        }
        options={[
          { value: "account", label: "Account" },
          {
            value: "tickets-bookings",
            label: isDesktop ? "Tickets/Bookings" : "Bookings",
          },
          {
            value: "payment-methods",
            label: isDesktop ? "Payment methods" : "Pay methods",
          },
        ]}
      />
    </div>
  );
}
