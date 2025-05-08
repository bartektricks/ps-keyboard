ALTER TABLE "votes" ALTER COLUMN "vote" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "vote" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."vote";