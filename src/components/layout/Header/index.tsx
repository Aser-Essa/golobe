import { Separator } from "#/components/ui/separator";
import { Show } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import Logo from "../Logo";
import HeaderAuth from "./HeaderAuth";
import HeaderNav from "./HeaderNav";
import HeaderUserMenu from "./HeaderUserMenu";

export default function Header() {
  return (
    <header className="box-shadow-sm fixed top-0 left-0 z-2000 flex h-20 w-full items-center justify-between bg-white/50 px-4 py-5 backdrop-blur-md sm:h-22 sm:px-8 md:px-16 xl:px-26">
      <HeaderNav />
      <Logo className="mx-auto w-20 sm:w-auto" />
      <Show when={"signed-out"}>
        <HeaderAuth />
      </Show>
      <Show when={"signed-in"}>
        <div className="flex items-center gap-4">
          <Link
            to="/favourites"
            className="relative flex items-center gap-1"
            viewTransition
          >
            <Heart fill="#000" />
            <p className="hidden text-sm font-semibold sm:block">Favorites</p>
          </Link>

          <Separator
            orientation="vertical"
            className="m-auto h-4.5 w-px bg-black"
          />
          <HeaderUserMenu />
        </div>
      </Show>
    </header>
  );
}
