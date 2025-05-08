"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Game } from "../games-list/types";
import { GameCombobox } from "./game-combobox";

type InsertGame = Omit<Game, "id" | "votes">;

interface AddGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGame: (game: InsertGame) => void;
}

export function AddGameDialog({
  open,
  onOpenChange,
  onAddGame,
}: AddGameDialogProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [inputSupport, setInputSupport] = useState<string>("mouse-keyboard");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGame) return;

    const newGame: InsertGame = {
      name: selectedGame,
      supportsMouse:
        inputSupport === "mouse-keyboard" || inputSupport === "mouse",
      supportsKeyboard:
        inputSupport === "mouse-keyboard" || inputSupport === "keyboard",
      cover: "/placeholder.svg?height=300&width=200",
    };

    onAddGame(newGame);
    resetForm();
  };

  const resetForm = () => {
    setSelectedGame(null);
    setInputSupport("mouse-keyboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Add Missing Game
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="game" className="text-slate-700">
              Game Title
            </Label>
            <GameCombobox
              selectedGame={selectedGame}
              onSelect={setSelectedGame}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700">Input Support</Label>
            <RadioGroup
              value={inputSupport}
              onValueChange={setInputSupport}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3">
                <RadioGroupItem
                  value="mouse-keyboard"
                  id="mouse-keyboard"
                  className="border-blue-600 text-blue-600"
                />
                <Label
                  htmlFor="mouse-keyboard"
                  className="font-medium text-slate-700 cursor-pointer"
                >
                  Mouse & Keyboard
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3">
                <RadioGroupItem
                  value="keyboard"
                  id="keyboard"
                  className="border-blue-600 text-blue-600"
                />
                <Label
                  htmlFor="keyboard"
                  className="font-medium text-slate-700 cursor-pointer"
                >
                  Keyboard Only
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3">
                <RadioGroupItem
                  value="mouse"
                  id="mouse"
                  className="border-blue-600 text-blue-600"
                />
                <Label
                  htmlFor="mouse"
                  className="font-medium text-slate-700 cursor-pointer"
                >
                  Mouse Only
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedGame}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Add Game
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
