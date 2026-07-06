import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";

export const getAuthStatus = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();

  return { isAuthenticated };
});

export const requireAuth = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/sign-in",
    });
  }

  return { userId };
});

export const getTokenServer = createServerFn().handler(async () => {
  const { isAuthenticated, getToken } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/sign-in",
    });
  }

  const token = await getToken();

  return { token };
});
