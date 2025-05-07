import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { Pagination } from "@/components/pagination"
// import { AddGameDialog } from "@/components/add-game-dialog"
// import { mockGames } from "@/lib/mock-data"
// import type { Game } from "@/lib/types"
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Game } from "./types";
import {
  getInputSupportColor,
  getInputSupportLabel,
  getPlayabilityColor,
  getPlayabilityLabel,
} from "./utils";
// import { RequestChangeDialog } from "@/components/request-change-dialog"
// import { VoteButtons } from "@/components/vote-buttons"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function GamesList() {
  const filteredGames = [];
  const paginatedGames: Game[] = [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">
          {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"}{" "}
          found
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      {paginatedGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedGames.map((game) => (
            <div
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
                      <TooltipTrigger asChild>{game.votes}</TooltipTrigger>
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
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getInputSupportColor(
                        game,
                      )}`}
                    >
                      {getInputSupportLabel(game)}
                    </span>
                    <span
                      className={`text-xs font-medium ${getPlayabilityColor(
                        game.votes,
                      )}`}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium mb-2 text-slate-800">
            No games found
          </h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search or filters
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Missing Game
          </Button>
        </div>
      )}

      {/* {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />} */}

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
