import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function RouteNotFound({ className }: { className?: string }) {
  return (
    <main
      className={cn(
        "bg-background flex min-h-screen items-center justify-center px-6",
        className,
      )}
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="bg-primary/10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full">
          <SearchX className="text-primary h-12 w-12" />
        </div>

        <span className="font-trade-gothic text-primary text-7xl font-bold tracking-wide">
          404
        </span>

        <h1 className="font-trade-gothic text-foreground mt-4 text-4xl font-bold">
          Not Found
        </h1>

        <p className="text-muted-foreground mt-4">
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the URL is incorrect.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link viewTransition to="/">
              <Home className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </main>
  );
}
