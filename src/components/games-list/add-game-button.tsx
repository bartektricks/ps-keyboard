"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AddGameDialog } from "../add-game-dialog";

export function AddGameButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="mr-2 size-4" />
        Add Game
      </Button>
      <AddGameDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
