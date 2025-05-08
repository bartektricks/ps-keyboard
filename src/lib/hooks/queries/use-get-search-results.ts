import {
  type SearchErrorResponse,
  type SearchSuccessResponse,
} from "@/app/api/v1/psn/search/route";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { searchResultsKeys } from "../../query-keys";

export const useGetSearchResults = (query: string) => {
  return useQuery<SearchSuccessResponse, AxiosError<SearchErrorResponse>>({
    queryFn: () =>
      axios
        .post("/api/v1/psn/search", { search: query })
        .then((res) => res.data),
    queryKey: searchResultsKeys.search(query),
    enabled: query.length > 0,
    refetchInterval: 0,
  });
};
