import { gamesTable } from "@/db/schema";

export interface Game {
  id: number;
  name: string;
  cover: string;
  votes: number;
  tags: typeof gamesTable.$inferSelect.verifiedTags | null;
  voted: number | null;
}
