import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const filters = ["all", "keyboard", "mouse", "mouse-keyboard"] as const;

export const gameFilterParams = {
  q: parseAsString.withDefault(""),
  filter: parseAsStringLiteral(filters).withDefault("all"),
  page: parseAsInteger.withDefault(1),
};

export const gameFilterParamsCache = createSearchParamsCache(gameFilterParams);
