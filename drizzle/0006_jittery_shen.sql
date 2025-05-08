ALTER TABLE "votes" ALTER COLUMN "vote" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "vote" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_fingerprintId_unique" UNIQUE("fingerprintId");