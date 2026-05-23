import { cn } from "#/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-4 mt-34 sm:mx-8 md:mx-16 xl:mx-26", className)}>
      {children}
    </div>
  );
}
