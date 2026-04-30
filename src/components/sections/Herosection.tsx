import { useAuth } from "@clerk/tanstack-react-start";

export default function Herosection() {
  const { signOut } = useAuth();
  return (
    <>
      <div className="aspect-video w-full">
        <img
          src="herosection-bg.png"
          className="h-full max-h-[572px] w-full object-cover"
        />
      </div>
      <button
        onClick={async () => await signOut().then(() => {})}
        className="border-primary hover:bg-primary/15 flex h-14 w-full cursor-pointer items-center justify-center rounded-sm border transition-all"
      >
        Logout
      </button>
    </>
  );
}
