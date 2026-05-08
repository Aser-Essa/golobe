import { Link } from "@tanstack/react-router";
import { BedDouble, Heart } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/tanstack-react-start";

export default function Header() {
  const { signOut } = useAuth();
  return (
    <>
      <header className="box-shadow-sm fixed top-0 left-0 z-2000 flex h-22 w-full items-center justify-between bg-white/50 px-26 py-5 backdrop-blur-md">
        <nav>
          <Link to="/" className="relative flex items-center gap-1">
            <BedDouble />
            <p className="text-sm font-semibold">Find Stays</p>
          </Link>
        </nav>
        <Logo />

        <button
          onClick={async () => await signOut().then(() => {})}
          className="border-primary hover:bg-primary/15 flex h-14 cursor-pointer items-center justify-center rounded-sm border transition-all"
        >
          Logout
        </button>
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
