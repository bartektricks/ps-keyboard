import z from "zod";

export const searchGameSchema = z.object({
  search: z.string().min(2, "Search query must be at least 2 characters long"),
});

export type SearchGameSchema = z.infer<typeof searchGameSchema>;
