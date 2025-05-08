"use server";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { getSearchResults } from "@/lib/api/psn-api/get-search-results";
import { actionClient } from "@/lib/safe-action";
import { addGameSchema } from "@/lib/schemas/add-game-schema";
import { searchGameSchema } from "@/lib/schemas/search-game-schema";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { revalidatePath } from "next/cache";

function getTags(
  value: string,
): typeof gamesTable.$inferSelect.notVerifiedTags {
  switch (value) {
    case "mouse-keyboard":
      return ["supports-keyboard", "supports-mouse"];
    case "mouse":
      return ["supports-mouse"];
    case "keyboard":
      return ["supports-keyboard"];
    default:
      return [];
  }
}

export const addGameAction = actionClient
  .schema(addGameSchema, {
    handleValidationErrorsShape: async (v) => flattenValidationErrors(v),
  })
  .action(async ({ parsedInput }) => {
    const { id, title, cover, supportType } = parsedInput;

    const existingGame = await db.query.gamesTable.findFirst({
      columns: {
        id: true,
      },
      where: (gamesTable, { eq }) => eq(gamesTable.psnGameId, id),
    });

    if (existingGame) {
      return returnValidationErrors(addGameSchema, {
        _errors: ["Game already exists"],
      });
    }

    try {
      await db.insert(gamesTable).values({
        name: title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        psnGameId: id,
        cover: cover,
        verifiedTags: getTags(supportType),
      });
      revalidatePath("/");
      return {
        success: true,
      };
    } catch {
      return returnValidationErrors(addGameSchema, {
        _errors: ["Failed to add game"],
      });
    }
  });

export type DesiredGamesResponse = {
  id: string;
  title: string;
  cover: string;
}[];

export const searchGameAction = actionClient
  .schema(searchGameSchema, {
    handleValidationErrorsShape: async (v) => flattenValidationErrors(v),
  })
  .action(async ({ parsedInput }) => {
    const { data } = await getSearchResults(parsedInput.search);

    const gamesResponse = data.data.universalContextSearch.results.find(
      (res) => res.domain === "MobileGames",
    );

    if (!gamesResponse) {
      return { count: 0, games: [] };
    }

    const games: DesiredGamesResponse = gamesResponse.searchResults.map(
      (res) => {
        const media =
          res.result.media.find(
            (media) => media.role === "GAMEHUB_COVER_ART",
          ) || res.result.media[0];

        return {
          id: res.id,
          title: res.result.invariantName,
          cover: media.url,
        };
      },
    );

    return {
      count: gamesResponse.totalResultCount,
      games,
    };
  });
