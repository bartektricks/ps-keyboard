import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Game } from "./types";
import {
  getInputSupportColor,
  getInputSupportLabel,
  getPlayabilityColor,
  getPlayabilityLabel,
  mapFilterToTags,
} from "./utils";
import { EmptyList } from "./empty-list";
import { VoteButtons } from "@/components/vote-buttons";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";
import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { and, arrayContains, ilike } from "drizzle-orm";
import {
  gameFilterParams,
  gameFilterParamsCache,
} from "@/lib/params/game-filter";
import { type inferParserType } from "nuqs";

const PAGE_LIMIT = 9;

async function getFilteredGames({
  q,
  page,
  filter,
}: inferParserType<typeof gameFilterParams>): Promise<Game[]> {
  const offset = page ? (page - 1) * 9 : 0;
  const tags = mapFilterToTags(filter);

  const games = await db
    .select({
      id: gamesTable.id,
      name: gamesTable.name,
      cover: gamesTable.cover,
      tags: gamesTable.verifiedTags,
    })
    .from(gamesTable)
    .where(
      and(
        tags ? arrayContains(gamesTable.verifiedTags, tags) : undefined,
        q ? ilike(gamesTable.name, `%${q}%`) : undefined,
      ),
    )
    .limit(PAGE_LIMIT)
    .offset(offset);

  if (!games) return [];

  return games.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover || "/placeholder.svg",
    votes: 0, // Placeholder for votes
    supportsKeyboard: Boolean(game.tags?.includes("supports-keyboard")),
    supportsMouse: Boolean(game.tags?.includes("supports-mouse")),
  }));
}

async function getFilteredGamesCount(query?: string) {
  return await db.$count(
    gamesTable,
    query ? ilike(gamesTable.name, `%${query}%`) : undefined,
  );
}

export async function GamesList() {
  const params = gameFilterParamsCache.all();
  const { q, page } = params;

  const totalFilteredGames = await getFilteredGamesCount(q);
  const paginatedGames = await getFilteredGames(params);

  const totalPages = Math.ceil(totalFilteredGames / PAGE_LIMIT);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">
          {totalFilteredGames} {totalFilteredGames === 1 ? "game" : "games"}{" "}
          found
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 size-4" />
          Add Game
        </Button>
      </div>

      {paginatedGames.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedGames.map((game) => (
            <li
              key={game.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={game.cover || "/placeholder.svg"}
                  alt={`${game.name} cover`}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-slate-800">
                    {game.name}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <VoteButtons
                            gameId={game.id}
                            initialVotes={game.votes}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Vote if this game is truly playable with the listed
                          input methods
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-medium",
                        getInputSupportColor(game),
                      )}
                    >
                      {getInputSupportLabel(game)}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        getPlayabilityColor(game.votes),
                      )}
                    >
                      {getPlayabilityLabel(game.votes)}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-slate-200 text-slate-600 hover:bg-slate-50 w-full mt-2"
                  >
                    Request Change
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}

      {/* <AddGameDialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen} onAddGame={addGame} /> */}
      {/* {selectedGame && (
        <RequestChangeDialog
          open={isRequestChangeOpen}
          onOpenChange={setIsRequestChangeOpen}
          game={selectedGame}
          onUpdateGame={(updatedGame) => {
            setGames(games.map((g) => (g.id === updatedGame.id ? updatedGame : g)))
            setIsRequestChangeOpen(false)
          }}
        />
      )} */}
    </div>
  );
}
