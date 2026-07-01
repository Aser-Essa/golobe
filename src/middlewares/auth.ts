import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";

async function requireAuth() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/sign-in",
    });
  }

  return { userId };
}

export const authFnMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { userId } = await requireAuth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return next({ context: { userId } });
  },
);
