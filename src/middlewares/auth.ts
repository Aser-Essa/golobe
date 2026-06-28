import { requireAuth } from "#/server/auth";
import { createMiddleware } from "@tanstack/react-start";

export const authFnMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { userId } = await requireAuth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return next({ context: { userId } });
  },
);
