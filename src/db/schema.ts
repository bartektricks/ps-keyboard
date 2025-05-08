import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
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
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const gamesTableRelations = relations(gamesTable, ({ many }) => ({
  votes: many(votesTable),
}));

export const votesTable = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fingerprintId: varchar({ length: 255 }).notNull(),
  vote: integer().default(0),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  gameId: integer()
    .notNull()
    .references(() => gamesTable.id),
});

export const votesTableRelations = relations(votesTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [votesTable.gameId],
    references: [gamesTable.id],
  }),
}));
