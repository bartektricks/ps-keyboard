import { GamesList } from "@/components/games-list";
import { GamesListLoader } from "@/components/games-list/games-list-loader";
import { SearchFilters } from "@/components/search-filters";
import { gameFilterParamsCache } from "@/lib/params/game-filter";

import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  gameFilterParamsCache.parse(await searchParams);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            PlayStation Games Explorer
          </h1>
          <p className="text-slate-600">
            Find games that support your preferred input method
          </p>
        </header>

        {/* Top leaderboard ad - only ad on the page */}
        {/* <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" slot="top-leaderboard" />
        </div> */}

        <div className="grid gap-8">
          <SearchFilters />
          <Suspense fallback={<GamesListLoader />}>
            <GamesList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
