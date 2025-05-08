export const searchResultsKeys = {
  all: ["search"] as const,
  search: (query: string) => [...searchResultsKeys.all, query] as const,
};
