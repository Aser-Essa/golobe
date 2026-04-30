import { Link } from "@tanstack/react-router";
import { BedDouble, Heart } from "lucide-react";
import Logo from "./Logo";
import { Show, SignInButton, SignUpButton } from "@clerk/tanstack-react-start";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 flex h-22 w-full items-center justify-between bg-white/50 px-26 py-5 backdrop-blur-md">
        <nav>
          <Link to="/" className="relative flex items-center gap-1">
            <BedDouble />
            <p className="text-sm font-semibold">Find Stays</p>
          </Link>
        </nav>
        <Logo />
        <Show when={"signed-out"}>
          <div className="flex items-center gap-4">
            <SignInButton>
              <Button variant={"outline"} className="p-4.5">
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="p-4.5">Get Started</Button>
            </SignUpButton>
          </div>
        </Show>

        <Show when={"signed-in"}>
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="relative flex items-center gap-1">
              <Heart fill="true" />
              <p className="text-sm font-semibold">Favorites</p>
            </Link>

            <div className="h-4.5 w-0.5 bg-black"></div>

            <Link to="/profile" className="relative flex items-center gap-1">
              <img src="/profile.png" className="aspect-square h-11 w-11" />
              <p className="text-sm font-semibold">John D.</p>
            </Link>
          </div>
        </Show>
      </header>
    </>
  );
}
