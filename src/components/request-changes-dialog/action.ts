"use server";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { requestChangesSchema } from "@/lib/schemas/request-changes-schema";
import { eq } from "drizzle-orm";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { revalidatePath } from "next/cache";

export const requestChangesAction = actionClient
  .schema(requestChangesSchema, {
    handleValidationErrorsShape: async (v) => flattenValidationErrors(v),
  })
  .action(async ({ parsedInput }) => {
    const { id, supportType } = parsedInput;

    const existingGame = await db.query.gamesTable.findFirst({
      columns: {
        verifiedTags: true,
        notVerifiedTags: true,
      },
      where: (gamesTable, { eq }) => eq(gamesTable.id, id),
    });

    if (!existingGame) {
      return returnValidationErrors(requestChangesSchema, {
        _errors: ["Game not found"],
      });
    }

    if (existingGame.verifiedTags?.find((tag) => tag === supportType)) {
      return returnValidationErrors(requestChangesSchema, {
        _errors: ["Game already has this support type"],
      });
    }

    const notVerifiedTags = existingGame.notVerifiedTags || [];

    if (notVerifiedTags.find((tag) => tag === supportType)) {
      return returnValidationErrors(requestChangesSchema, {
        _errors: [
          "Someone already requested this support type, wait for approval",
        ],
      });
    }

    if (notVerifiedTags.length > 0) {
      return returnValidationErrors(requestChangesSchema, {
        _errors: [
          `Someone already requested a change to the support type with a different value.
          If you think it's wrong, please wait for approval or contact us at bartektricks@gmail.com.`,
        ],
      });
    }

    try {
      await db
        .update(gamesTable)
        .set({
          notVerifiedTags: [supportType],
        })
        .where(eq(gamesTable.id, id));

      revalidatePath("/");
      return {
        success: true,
      };
    } catch {
      return returnValidationErrors(requestChangesSchema, {
        _errors: ["Failed to request changes"],
      });
    }
  });
