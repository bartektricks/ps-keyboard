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
import { GameCombobox, SelectedGame } from "./game-combobox";
import { addGameSchema } from "@/lib/schemas/add-game-schema";
import { addGameAction } from "./action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface AddGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGameDialog({ open, onOpenChange }: AddGameDialogProps) {
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const [inputSupport, setInputSupport] = useState<string>("mouse-keyboard");
  const { execute } = useAction(addGameAction, {
    onSuccess: () => {
      toast.success("Game added successfully", {
        richColors: true,
        dismissible: true,
      });
      onOpenChange(false);
    },
    onError: (res) => {
      const error =
        res.error.validationErrors?.formErrors.join(", ") ||
        "Something went wrong";

      toast.error(error, {
        richColors: true,
        dismissible: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGame) return;

    const newGame = {
      ...selectedGame,
      supportType: inputSupport,
    };

    const parsedSchema = addGameSchema.safeParse(newGame);

    if (!parsedSchema.success) {
      console.error(parsedSchema.error);
      return;
    }

    execute(parsedSchema.data);
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
              <RadioInput value="mouse-keyboard">
                <span>Mouse & Keyboard</span>
              </RadioInput>
              <RadioInput value="mouse">
                <span>Mouse Only</span>
              </RadioInput>
              <RadioInput value="keyboard">
                <span>Keyboard Only</span>
              </RadioInput>
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

function RadioInput({
  value,
  children,
}: React.PropsWithChildren<{ value: string }>) {
  return (
    <Label
      htmlFor={value}
      className="font-medium text-slate-700 cursor-pointer flex items-center space-x-2 rounded-md border border-slate-200 p-3"
    >
      <RadioGroupItem
        value={value}
        id={value}
        className="border-blue-600 text-blue-600"
      />
      {children}
    </Label>
  );
}
