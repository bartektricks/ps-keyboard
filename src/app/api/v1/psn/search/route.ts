import { getSearchResults } from "@/lib/api/psn-api/get-search-results";
import { searchGameSchema } from "@/lib/schemas/search-game-schema";
import { NextResponse } from "next/server";
import { z } from "zod";

type DesiredGamesResponse = {
  id: string;
  title: string;
  cover: string;
}[];

export type SearchSuccessResponse = {
  count: number;
  games: DesiredGamesResponse;
};

export type SearchErrorResponse = {
  errors: z.inferFlattenedErrors<typeof searchGameSchema>["fieldErrors"];
};

type SearchResponse =
  | NextResponse<SearchSuccessResponse>
  | NextResponse<SearchErrorResponse>;

export async function POST(request: Request): Promise<SearchResponse> {
  const body = await request.json();
  const parsedBody = searchGameSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { errors: parsedBody.error.formErrors.fieldErrors },
      { status: 400 },
    );
  }

  const { search } = parsedBody.data;

  const { data } = await getSearchResults(search);

  const gamesResponse = data.data.universalContextSearch.results.find(
    (res) => res.domain === "MobileGames",
  );

  if (!gamesResponse) {
    return NextResponse.json({ count: 0, games: [] });
  }

  const games: DesiredGamesResponse = gamesResponse.searchResults.map((res) => {
    const media =
      res.result.media.find((media) => media.role === "GAMEHUB_COVER_ART") ||
      res.result.media[0];

    return {
      id: res.id,
      title: res.result.invariantName,
      cover: media.url,
    };
  });

  return NextResponse.json({
    count: gamesResponse.totalResultCount,
    games,
  });
}
