import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Logo({
  className,
  varient = "green",
}: {
  className?: string;
  varient?: "green" | "white";
}) {
  return (
    <Link to="/"  className={cn(className)}>
      {varient === "white" ? (
        <img src="/logo-white-o.svg" alt="logo" />
      ) : (
        <img src="/logo-green-o.svg" alt="logo" />
      )}
    </Link>
  );
}
