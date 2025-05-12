import { z } from "zod";
import { addGameSchema } from "./add-game-schema";

export const requestChangesSchema = addGameSchema
  .pick({
    supportType: true,
  })
  .extend({
    id: z.number().min(1, "Game ID is required"),
  });
