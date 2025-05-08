CREATE TYPE "public"."vote" AS ENUM('upvote', 'downvote');--> statement-breakpoint
ALTER TABLE "votes" RENAME COLUMN "isPositive" TO "vote";