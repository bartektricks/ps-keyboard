import { gameFilterParams } from "@/lib/params/game-filter";
import { useQueryStates } from "nuqs";

export function useGetGameFilterParams() {
  return useQueryStates(gameFilterParams);
}
