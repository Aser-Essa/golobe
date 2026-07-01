import { isValid, parseISO } from "date-fns";


export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

export const parseDate = (val: unknown, fallback?: Date): Date => {
  if (!val) return fallback ?? new Date();
  const str = String(val);
  const parsed = parseISO(str.slice(0, 10));
  return isValid(parsed) ? parsed : (fallback ?? new Date());
};