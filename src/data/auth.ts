import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const checkAuthFn = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();
  return { isAuthenticated };
});
