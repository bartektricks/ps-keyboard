ALTER TABLE "games" RENAME COLUMN "tags" TO "verifiedTags";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "createdAt" SET DEFAULT 1746615121072;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "updatedAt" SET DEFAULT 1746615121072;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "createdAt" SET DEFAULT 1746615121073;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "updatedAt" SET DEFAULT 1746615121073;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "notVerifiedTags" "tags"[];