"use client";

import { gameFilterParams } from "@/lib/params/game-filter";
import { Search } from "lucide-react";

import { useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GameSearch() {
  const [params, setParams] = useQueryStates(gameFilterParams);

  const handleSearch = (formData: FormData) => {
    const query = formData.get("q")?.toString() || "";

    setParams({ q: query });
  };

  return (
    <form action={handleSearch} className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search games..."
          className="pl-10 border-slate-200 focus-visible:ring-blue-500"
          name="q"
          defaultValue={params.q}
        />
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        Search
      </Button>
    </form>
  );
}
