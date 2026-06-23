import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import SocialAuthButtons from "./SocialAuthButtons";
import { useNavigate } from "@tanstack/react-router";

export default function CheckoutLoginSection() {
  const navigate = useNavigate();

  function handleClick() {
    navigate({ to: "/sign-in" });
  }

  return (
    <div className="box-shadow-sm space-y-6 rounded-[12px] bg-white p-4 sm:p-6">
      <div className="space-y-4">
        <p className="text-xl font-bold">Login or Sign up to book</p>
        <Button
          variant={"outline"}
          className="flex h-12 w-full items-center gap-4 bg-white"
          onClick={handleClick}
        >
          <Mail />
          <p> Continue with email</p>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-foreground/25 h-0.25 w-full"></div>
        <p className="text-foreground text-center text-sm font-medium text-nowrap">
          Or
        </p>
        <div className="bg-foreground/25 h-0.25 w-full"></div>
      </div>

      <SocialAuthButtons mode="signin" />
    </div>
  );
}
