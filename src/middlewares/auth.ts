import { auth } from "@clerk/tanstack-react-start/server";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

export const authFnMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return next({ context: { userId } });
  },
);

export const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ request, next }) => {
    const url = new URL(request.url);

    if (
      !url.pathname.startsWith("/bookings") &&
      !url.pathname.startsWith("/favourites") &&
      !url.pathname.startsWith("/profile")
    ) {
      return next({});
    }

    try {
      const { userId } = await auth();

      if (!userId) {
        throw redirect({
          to: "/sign-in",
          search: { redirect_url: request.url },
        });
      }

      return next({ context: { userId } });
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: "/sign-in" });
    }
  },
);
