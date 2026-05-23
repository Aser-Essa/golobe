import { Link } from "@tanstack/react-router";
import { BedDouble } from "lucide-react";

export default function HeaderNav() {
  return (
    <nav className="hidden gap-2 md:flex">
      <Link to="/" className="relative flex items-center gap-1">
        <BedDouble />
        <p className="text-sm font-semibold">Find Stays</p>
      </Link>
    </nav>
  );
}
