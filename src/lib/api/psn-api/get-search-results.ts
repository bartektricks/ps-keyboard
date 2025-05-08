import { psnApi } from ".";

// Main response type
interface UniversalContextSearchResponse {
  __typename: "UniversalContextSearchResponse";
  queryFrequency: QueryFrequency;
  results: Array<UniversalDomainSearchResponse>;
}

// Query frequency settings
interface QueryFrequency {
  __typename: "QueryFrequency";
  filterDebounceMs: number;
  searchDebounceMs: number;
}

// Response for a specific domain (Games, Add-Ons, etc.)
interface UniversalDomainSearchResponse {
  __typename: "UniversalDomainSearchResponse";
  domain: "MobileGames" | "MobileAddOns" | (string & {});
  domainTitle: string;
  next: string;
  searchResults: Array<SearchResultItem>;
  totalResultCount: number;
  zeroState: boolean;
}

// Individual search result
export interface SearchResultItem {
  __typename: "SearchResultItem";
  highlight: ItemHighlight | null;
  id: string;
  result: Concept | Product;
  resultOriginFlag: null;
}

// Highlight information for search results
interface ItemHighlight {
  __typename: "ItemHighlight";
  name: Array<string> | null;
}

// Base type for media content
interface Media {
  __typename: "Media";
  role: MediaRole;
  type: "IMAGE" | "VIDEO";
  url: string;
}

// All possible media roles
type MediaRole =
  | "PREVIEW"
  | "BACKGROUND"
  | "EDITION_KEY_ART"
  | "FOUR_BY_THREE_BANNER"
  | "GAMEHUB_COVER_ART"
  | "LOGO"
  | "PORTRAIT_BANNER"
  | "SCREENSHOT"
  | "MASTER"
  | "BACKGROUND_LAYER_ART"
  | "HERO_CHARACTER";

// Common properties for both Concept and Product
interface ContentBase {
  id: string;
  invariantName: string;
  itemType: string;
  localizedStoreDisplayClassification: string | null;
  media: Media[];
  name: string;
  platforms: string[];
  price: null;
  storeDisplayClassification: string | null;
}

// Game concept (can contain multiple products)
interface Concept extends ContentBase {
  __typename: "Concept";
  defaultProduct: Product | null;
}

// Specific product version of a concept
interface Product extends ContentBase {
  __typename: "Product";
  type: string;
}

// Root type for the entire JSON structure
type PSStoreSearchResponseRoot = {
  data: {
    universalContextSearch: UniversalContextSearchResponse;
  };
};

export const getSearchResults = (searchTerm: string) =>
  psnApi.get<PSStoreSearchResponseRoot>(
    `/op?operationName=metGetContextSearchResults&variables={"searchTerm":"${searchTerm}","searchContext":"MobileUniversalSearchGame","displayTitleLocale":"en-US"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"ac5fb2b82c4d086ca0d272fba34418ab327a7762dd2cd620e63f175bbc5aff10"}}`,
  );
