import { Button } from "#/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  RefreshCcw,
} from "lucide-react";
import { cn } from "#/lib/utils";
import { useState } from "react";
import Container from "../layout/Container";

type RouteErrorProps = {
  error: Error;
  reset?: () => void;
};

export default function RouteError({ error, reset }: RouteErrorProps) {
  const navigate = useNavigate();
  const [retrying, setRetrying] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => {
      navigate({
        to: ".",
        search: (prev) => prev,
        replace: true,
        reloadDocument: true,
      });
      setRetrying(false);
    }, 400);
  }

  function handleBack() {
    navigate({ to: "/" });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(error.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Container>
      <div className="flex h-[70vh] w-full items-center justify-center px-4">
        <div className="border-border bg-card w-full max-w-md rounded-2xl border p-7 text-center shadow-sm">
          {/* Icon */}
          <div className="mb-5 flex justify-center">
            <div className="bg-destructive/10 flex size-13 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive size-5" />
            </div>
          </div>

          {/* Copy */}
          <h2 className="text-foreground text-base font-medium">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            We couldn't load the data. Please try again or go back.
          </p>

          {/* Error box */}
          {error.message && (
            <div className="border-border mt-4 overflow-hidden rounded-lg border text-left">
              <div className="border-border bg-muted/45 flex items-center justify-between border-b px-3 py-1.5">
                <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                  error details
                </span>
                <button
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1 text-[11px] transition-colors"
                >
                  {copied ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  {copied ? "copied!" : "copy"}
                </button>
              </div>
              <pre className="text-destructive px-3 py-2.5 font-mono text-xs leading-relaxed break-all whitespace-pre-wrap">
                {error.message}
              </pre>
            </div>
          )}

          <hr className="border-border my-5" />

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleRetry}
              disabled={retrying}
              className="h-10 w-full gap-2"
            >
              <RefreshCcw
                className={cn("size-4", retrying && "animate-spin")}
              />
              {retrying ? "Retrying…" : "Try again"}
            </Button>

            <Button
              variant="outline"
              onClick={handleBack}
              className="h-10 w-full gap-2"
            >
              <ArrowLeft className="size-4" />
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
