import "server-only";
import { Game } from "./types";
import { mapFilterToTags } from "./utils";
import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import {
  and,
  arrayContained,
  arrayContains,
  arrayOverlaps,
  eq,
  ilike,
  inArray,
} from "drizzle-orm";
import { gameFilterParams } from "@/lib/params/game-filter";
import { type inferParserType } from "nuqs";

export const PAGE_LIMIT = 9;

export async function getFilteredGames({
  q,
  page,
  filter,
}: inferParserType<typeof gameFilterParams>): Promise<Game[]> {
  const offset = page ? (page - 1) * PAGE_LIMIT : 0;
  const tags = mapFilterToTags(filter);

  const games = await db
    .select({
      id: gamesTable.id,
      name: gamesTable.name,
      cover: gamesTable.cover,
      tags: gamesTable.verifiedTags,
    })
    .from(gamesTable)
    .where(
      and(
        tags ? eq(gamesTable.verifiedTags, tags) : undefined,
        q ? ilike(gamesTable.name, `%${q}%`) : undefined
      )
    )
    .limit(PAGE_LIMIT)
    .offset(offset);

  if (!games) return [];

  return games.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover || "/placeholder.svg",
    votes: 0, // Placeholder for votes
    supportsKeyboard: Boolean(game.tags?.includes("supports-keyboard")),
    supportsMouse: Boolean(game.tags?.includes("supports-mouse")),
  }));
}
