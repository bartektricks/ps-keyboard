ALTER TABLE "games" ALTER COLUMN "verifiedTags" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "notVerifiedTags" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."tags";--> statement-breakpoint
CREATE TYPE "public"."tags" AS ENUM('keyboard', 'mouse', 'mouse-keyboard');--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "verifiedTags" SET DATA TYPE "public"."tags" USING "verifiedTags"::"public"."tags";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "notVerifiedTags" SET DATA TYPE "public"."tags" USING "notVerifiedTags"::"public"."tags";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "verifiedTags" SET DATA TYPE "public"."tags" USING "verifiedTags"::text::"public"."tags";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "notVerifiedTags" SET DATA TYPE "public"."tags" USING "notVerifiedTags"::text::"public"."tags";