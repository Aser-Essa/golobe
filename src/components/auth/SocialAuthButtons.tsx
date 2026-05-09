import { SocialAuthButton } from "./SocialAuthButton";

export default function SocialAuthButtons() {
  return (
    <>
      <div className="flex items-center gap-4">
        <SocialAuthButton strategy="oauth_facebook">
          <img src="/facebook.svg" alt="facebook" className="size-6" />
        </SocialAuthButton>

        <SocialAuthButton strategy="oauth_google">
          <img src="/google.svg" alt="google" className="size-6" />
        </SocialAuthButton>

        <div className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all">
          <img src="/apple.svg" alt="apple" className="size-6" />
        </div>
      </div>
    </>
  );
}
