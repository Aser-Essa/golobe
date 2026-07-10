import { cn } from "#/lib/utils";

import { Link, useRouterState } from "@tanstack/react-router";
import { Link as ScrollLink } from "react-scroll";

export default function Logo({
  className,
  varient = "green",
}: {
  className?: string;
  varient?: "green" | "white";
}) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname === "/") {
    return (
      <ScrollLink
        to="top"
        smooth
        duration={500}
        className={cn(className, "cursor-pointer")}
      >
        {varient === "white" ? (
          <img src="/logo-white-o.svg" alt="logo" />
        ) : (
          <img src="/logo-green-o.svg" alt="logo" />
        )}
      </ScrollLink>
    );
  }

  return (
    <Link to="/" className={cn(className, "cursor-pointer")}>
      {varient === "white" ? (
        <img src="/logo-white-o.svg" alt="logo" />
      ) : (
        <img src="/logo-green-o.svg" alt="logo" />
      )}
    </Link>
  );
}
