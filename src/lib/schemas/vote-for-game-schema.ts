import { z } from "zod";

export const voteForGameSchema = z.object({
  gameId: z.number(),
  vote: z.number(),
});
