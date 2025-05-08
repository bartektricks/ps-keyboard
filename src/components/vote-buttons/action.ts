"use server";

import { db } from "@/db";
import { votesTable } from "@/db/schema";
import { getHashedUserIpAddress } from "@/lib/get-hashed-user-ip-address";
import { actionClient } from "@/lib/safe-action";
import { voteForGameSchema } from "@/lib/schemas/vote-for-game-schema";
import {
  formatValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { revalidatePath } from "next/cache";

export const addVote = actionClient
  .schema(voteForGameSchema, {
    handleValidationErrorsShape: async (v) => formatValidationErrors(v),
  })
  .action(async ({ parsedInput }) => {
    const hashedIpAddress = await getHashedUserIpAddress();

    if (!hashedIpAddress) {
      return returnValidationErrors(voteForGameSchema, {
        _errors: ["You can't vote"],
      });
    }

    const { gameId, vote } = parsedInput;

    await db
      .insert(votesTable)
      .values({
        fingerprintId: hashedIpAddress,
        gameId: gameId,
        vote: vote,
      })
      .onConflictDoUpdate({
        target: [votesTable.fingerprintId],
        set: {
          vote: vote,
        },
      });

    revalidatePath("/");
  });
