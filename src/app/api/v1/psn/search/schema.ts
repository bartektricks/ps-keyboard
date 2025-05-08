import z from "zod";

export const requestSchema = z.object({
  search: z.string().min(2, "Search query must be at least 2 characters long"),
});
