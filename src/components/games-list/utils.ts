import { gamesTable } from "@/db/schema";
import { type Game } from "./types";
import { type inferParserType } from "nuqs";
import { gameFilterParams } from "@/lib/params/game-filter";

export const getInputSupportLabel = (game: Game) => {
  if (game.tags?.includes("mouse-keyboard")) return "Mouse & Keyboard";
  if (game.tags?.includes("mouse")) return "Mouse Only";
  if (game.tags?.includes("keyboard")) return "Keyboard Only";
  return "Controller Only";
};

export const getInputSupportValue = (game: Game): string | null => {
  if (game.tags?.includes("mouse-keyboard")) return "mouse-keyboard";
  if (game.tags?.includes("mouse")) return "mouse";
  if (game.tags?.includes("keyboard")) return "keyboard";
  return null;
};

export const getInputSupportColor = (game: Game) => {
  if (game.tags?.includes("mouse") && game.tags?.includes("keyboard"))
    return "bg-green-100 text-green-800";
  if (game.tags?.includes("mouse")) return "bg-blue-100 text-blue-800";
  if (game.tags?.includes("keyboard")) return "bg-purple-100 text-purple-800";
  return "bg-slate-100 text-slate-800";
};

export const getPlayabilityLabel = (votes: number) => {
  if (votes >= 20) return "Highly Playable";
  if (votes >= 10) return "Playable";
  if (votes >= 0) return "Somewhat Playable";
  if (votes >= -10) return "Difficult to Play";
  return "Not Playable";
};

export const getPlayabilityColor = (votes: number) => {
  if (votes >= 20) return "text-green-600";
  if (votes >= 10) return "text-green-500";
  if (votes >= 0) return "text-amber-500";
  if (votes >= -10) return "text-orange-500";
  return "text-red-500";
};

export const mapFilterToTags = (
  filter?: inferParserType<typeof gameFilterParams.filter>,
): typeof gamesTable.$inferSelect.verifiedTags => {
  switch (filter) {
    case "keyboard":
    case "mouse":
    case "mouse-keyboard":
      return [filter];
    case "all":
    default:
      return null;
  }
};
