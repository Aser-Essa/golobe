import { useLocation, useNavigate } from "@tanstack/react-router";
import { TabFilter } from "../common/TabFilter";

export default function profileNavigation() {
  const navigate = useNavigate({ from: "/profile/" });
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  return (
    <div className="mt-8">
      <TabFilter
        defaultValue={path || "account"}
        onValueChange={(value) =>
          navigate({
            to: `/profile/${value}`,
            resetScroll: false,
          })
        }
        options={[
          { value: "account", label: "Account" },
          { value: "tickets-bookings", label: "Tickets/Bookings" },
          { value: "payment-methods", label: "Payment methods" },
        ]}
      />
    </div>
  );
}
