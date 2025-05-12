import "server-only";
import { Game } from "./types";
import { mapFilterToTags } from "./utils";
import { db } from "@/db";
import { gamesTable, votesTable } from "@/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { gameFilterParams } from "@/lib/params/game-filter";
import { type inferParserType } from "nuqs";
import { getHashedUserIpAddress } from "@/lib/get-hashed-user-ip-address";

export const PAGE_LIMIT = 9;

export async function getFilteredGames({
  q,
  page,
  filter,
}: inferParserType<typeof gameFilterParams>): Promise<Game[]> {
  const hashedIpAddress = await getHashedUserIpAddress();

  const offset = page ? (page - 1) * PAGE_LIMIT : 0;
  const tags = mapFilterToTags(filter);

  const gamesQuery = db
    .select({
      id: gamesTable.id,
      name: gamesTable.name,
      cover: gamesTable.cover,
      tags: gamesTable.verifiedTags,
      votes: sql<number>`sum(${votesTable.vote})`,
      voted: votesTable.vote,
    })
    .from(gamesTable)
    .leftJoin(votesTable, eq(gamesTable.id, votesTable.gameId))
    .where(
      and(
        tags ? eq(gamesTable.verifiedTags, tags) : undefined,
        q ? ilike(gamesTable.name, `%${q}%`) : undefined,
      ),
    )
    .groupBy(gamesTable.id, votesTable.vote)
    .limit(PAGE_LIMIT)
    .offset(offset);

  const gameVotesQuery = hashedIpAddress
    ? db
        .select({ voted: votesTable.vote, gameId: votesTable.gameId })
        .from(votesTable)
        .where(eq(votesTable.fingerprintId, hashedIpAddress))
    : undefined;

  const [games, votes] = await Promise.all([gamesQuery, gameVotesQuery]);

  if (!games) return [];

  return games.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover || "/placeholder.svg",
    votes: game.votes || 0,
    tags: game.tags || [],
    voted: votes?.find((vote) => vote.gameId === game.id)?.voted || null,
  }));
}
