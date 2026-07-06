import { useLocation, useNavigate } from "@tanstack/react-router";
import { TabFilter } from "../common/TabFilter";

export default function profileNavigation() {
  const navigate = useNavigate({ from: "/profile/" });
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  const desktopOptions = [
    { value: "account", label: "Account" },
    { value: "tickets-bookings", label: "Tickets/Bookings" },
    { value: "payment-methods", label: "Payment methods" },
  ];

  const mobileOptions = [
    { value: "account", label: "Account" },
    { value: "tickets-bookings", label: "Bookings" },
    { value: "payment-methods", label: "Pay methods" },
  ];

  const handleValueChange = (value: string) =>
    navigate({
      to: `/profile/${value}`,
      resetScroll: false,
      viewTransition: true,
    });

  return (
    <div className="mt-8">
      <TabFilter
        defaultValue={path || "account"}
        className="hidden md:block"
        onValueChange={handleValueChange}
        options={desktopOptions}
      />

      <TabFilter
        defaultValue={path || "account"}
        className="block md:hidden"
        onValueChange={handleValueChange}
        options={mobileOptions}
      />
    </div>
  );
}
