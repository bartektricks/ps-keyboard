import "server-only";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { ilike } from "drizzle-orm";

export async function getFilteredGamesCount(query?: string): Promise<number> {
  try {
    return await db.$count(
      gamesTable,
      query ? ilike(gamesTable.name, `%${query}%`) : undefined,
    );
  } catch {
    return 0;
  }
}
