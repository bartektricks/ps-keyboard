import { z } from "zod";

export const addGameSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.string(),
  supportType: z.enum(["mouse-keyboard", "mouse", "keyboard"]),
});

export type AddGameSchema = z.infer<typeof addGameSchema>;
