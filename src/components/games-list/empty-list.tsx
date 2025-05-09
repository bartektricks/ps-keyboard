import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddGameDialog } from "../add-game-dialog";

export function EmptyList() {
  return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-medium mb-2 text-slate-800">
        No games found
      </h3>
      <p className="text-slate-600 mb-4">
        Try adjusting your search or filters
      </p>
      <AddGameDialog>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </AddGameDialog>
    </div>
  );
}
