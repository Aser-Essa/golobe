import type z from "zod";
import type { reviewFormSchema } from "../schemas";


export type reviewFormValues = z.infer<typeof reviewFormSchema>;
