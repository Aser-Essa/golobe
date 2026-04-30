import Herosection from "#/components/sections/Herosection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
  return <Herosection />;
}
