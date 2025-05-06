CREATE TYPE "public"."tags" AS ENUM('supports-keyboard', 'supports-mouse');--> statement-breakpoint
CREATE TABLE "games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"psnGameId" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"cover" varchar(255) NOT NULL,
	"verifiedTags" "tags"[],
	"notVerifiedTags" "tags"[],
	"createdAt" integer DEFAULT 1746547387505,
	"updatedAt" integer DEFAULT 1746547387505
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "votes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fingerprintId" varchar(255) NOT NULL,
	"isPositive" boolean NOT NULL,
	"createdAt" integer DEFAULT 1746547387506,
	"updatedAt" integer DEFAULT 1746547387506,
	"gameId" integer
);
--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;