import { Button } from "#/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/tanstack-react-start";

export default function HeaderAuth() {
  return (
    <div className="flex items-center gap-4 flex-1">
      <SignInButton>
        <Button variant={"outline"} className="p-4.5">
          Login
        </Button>
      </SignInButton>
      <SignUpButton>
        <Button className="p-4.5">Get Started</Button>
      </SignUpButton>
    </div>
  );
}
