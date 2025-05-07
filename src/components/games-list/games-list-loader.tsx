import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export function GamesListLoader() {
  const loadingItems: null[] = Array(8).fill(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Skeleton className="h-7 w-24" />
        </div>
        <Button className="bg-blue-600" disabled>
          <Plus className="mr-2 size-4" />
          Add Game
        </Button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loadingItems.map((_, index) => (
          <li
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200"
          >
            <Skeleton className="h-40 w-full" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-10" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>

                <Skeleton className="h-8 w-full mt-2" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <Skeleton className="h-9 w-64" />
      </div>
    </div>
  );
}
