import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/">
      <div className={cn(className)}>
        <img src="/logo.svg" alt="logo" />
      </div>
    </Link>
  );
}
