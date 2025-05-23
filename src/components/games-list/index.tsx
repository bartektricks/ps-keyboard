import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getInputSupportColor,
  getInputSupportLabel,
  getInputSupportValue,
  getPlayabilityColor,
  getPlayabilityLabel,
} from "./utils";
import { EmptyList } from "./empty-list";
import { VoteButtons } from "@/components/vote-buttons";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";
import { gameFilterParamsCache } from "@/lib/params/game-filter";
import { getFilteredGames, PAGE_LIMIT } from "./get-filtered-games";
import { getFilteredGamesCount } from "./get-filtered-games-count";
import { AddGameDialog } from "../add-game-dialog";
import { Plus } from "lucide-react";
import { RequestChangesDialog } from "../request-changes-dialog";

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
        <AddGameDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 size-4" />
            Add Game
          </Button>
        </AddGameDialog>
      </div>

      {paginatedGames.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedGames.map((game) => (
            <li
              key={game.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={game.cover || "/placeholder.svg"}
                  alt={`${game.name} cover`}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
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
                            initialVote={game.voted}
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

                <div className="flex flex-col gap-2 justify-between flex-1">
                  <div className="flex justify-between items-center mb-2">
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

                  <RequestChangesDialog
                    gameId={game.id}
                    gameTitle={game.name}
                    initialInputSupport={getInputSupportValue(game)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-slate-200 text-slate-600 hover:bg-slate-50 w-full"
                    >
                      Request Change
                    </Button>
                  </RequestChangesDialog>
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
    </div>
  );
}
