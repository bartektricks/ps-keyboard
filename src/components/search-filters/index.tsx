import { GameSearch } from "./game-search";
import { FilterButton } from "./filter-button";

export async function SearchFilters() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <GameSearch />

      <div className="flex flex-wrap gap-2">
        <FilterButton filter="all">All Games</FilterButton>
        <FilterButton filter="mouse-keyboard">Mouse & Keyboard</FilterButton>
        <FilterButton filter="keyboard">Keyboard Only</FilterButton>
        <FilterButton filter="mouse">Mouse Only</FilterButton>
      </div>
    </div>
  );
}
