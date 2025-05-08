"use server";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { addGameSchema } from "@/lib/schemas/add-game-schema";
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
