import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { generatePageButtonsParams, PageButtonItem } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRatingLabel(avg: number) {
  if (avg >= 4.8) return "Exceptional";
  if (avg >= 4.5) return "Excellent";
  if (avg >= 4.0) return "Very Good";
  if (avg >= 3.0) return "Good";
  if (avg >= 2.0) return "Fair";
  if (avg > 0) return "Poor";
  return "No Rating";
}

export function generatePageButtons({
  page,
  totalPages,
  windowSize,
}: generatePageButtonsParams): PageButtonItem[] {
  const windowEnd = Math.min(
    totalPages,
    windowSize * Math.ceil(page / windowSize),
  );
  const windowStart = windowEnd - windowSize + 1;

  let pages: PageButtonItem[] = Array.from(
    { length: windowSize },
    (_, i) => i + windowStart,
  );

  if (windowEnd < totalPages) pages = [...pages, "...", totalPages];
  if (windowStart > 1) pages = [1, "...", ...pages];

  return pages;
}
