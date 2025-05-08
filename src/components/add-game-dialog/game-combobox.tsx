"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounceValue } from "usehooks-ts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DesiredGamesResponse, searchGameAction } from "./action";
import { useAction } from "next-safe-action/hooks";

export type SelectedGame = DesiredGamesResponse[number];

interface GameComboboxProps {
  selectedGame: SelectedGame | null;
  onSelect: (value: SelectedGame | null) => void;
}

export function GameCombobox({ selectedGame, onSelect }: GameComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounceValue(searchQuery, 500);
  const { execute, result, isExecuting } = useAction(searchGameAction);

  useEffect(() => {
    execute({
      search: debouncedQuery,
    });
  }, [debouncedQuery, execute]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <div>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-slate-200"
          >
            {selectedGame?.title || "Search for a game..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput
            placeholder="Search PlayStation games..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {isExecuting ? (
            <div className="py-6 text-center text-sm text-slate-500">
              Searching...
            </div>
          ) : (
            <CommandList>
              <CommandEmpty>
                <span className="px-4">
                  {result.validationErrors?.fieldErrors.search?.join(", ") ||
                    "No games found"}
                </span>
              </CommandEmpty>

              <CommandGroup>
                {result.data?.games.map((game) => (
                  <CommandItem
                    key={game.id}
                    value={game.title}
                    onSelect={() => {
                      onSelect(game);
                      setOpen(false);
                    }}
                  >
                    {game.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
