import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const tagsEnum = pgEnum("tags", ["supports-keyboard", "supports-mouse"]);

export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  psnGameId: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  cover: varchar({ length: 255 }).notNull(),
  verifiedTags: tagsEnum().array(),
  notVerifiedTags: tagsEnum().array(),
  createdAt: integer().default(Date.now()),
  updatedAt: integer().default(Date.now()),
});

export const votesTable = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fingerprintId: varchar({ length: 255 }).notNull(),
  isPositive: boolean().notNull(),
  createdAt: integer().default(Date.now()),
  updatedAt: integer().default(Date.now()),
  gameId: integer().references(() => gamesTable.id, { onDelete: "cascade" }),
});
