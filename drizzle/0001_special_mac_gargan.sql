ALTER TABLE "votes" DROP CONSTRAINT "votes_gameId_games_id_fk";
--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "gameId" SET NOT NULL;