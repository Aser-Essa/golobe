import { createUserSchema } from "#/lib/schemas/user";
import { authFnMiddleware } from "#/middlewares/auth";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { createUserDB, deleteUserDB } from "./db";

export const createUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(createUserSchema)
  .handler(async ({ data: user }) => {
    return await createUserDB({ user });
  });

export const deleteUserFromDBServerFn = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await deleteUserDB(id);
  });
