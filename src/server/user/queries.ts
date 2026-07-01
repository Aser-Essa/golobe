import { authFnMiddleware } from "#/middlewares/auth";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const getUser = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    const user = await clerkClient().users.getUser(userId);

    return JSON.parse(JSON.stringify(user));
  });
