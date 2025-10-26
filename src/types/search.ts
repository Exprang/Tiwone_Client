import type { PropertyItem } from "./space";

export type SearchType = "NEARBY" | "TEXT" | "SMART";
export type DealType = "RENT" | "SALE" | "LEASE";
export type SpaceCategory =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "FARM"
  | "APARTMENT"
  | "ROOM"
  | "OFFICE"
  | "RETAIL"
  | "INDUSTRIAL"
  | "WAREHOUSE"
  | "HOTEL"
  | "HOSPITALITY"
  | "MULTIFAMILY"
  | "MIXED_USE"
  | "SPECIAL_PURPOSE"
  | "LAND"
  | "OTHER";

export type PriceDuration = "DAY" | "WEEK" | "MONTH" | "YEAR" | "ONE_TIME";

export interface PriceRange {
  gte?: number; // minimum price
  lte?: number; // maximum price
}

export interface Filters {
  name?: string; // partial match on space name
  space_type?: string; // exact match (APARTMENT, OFFICE, RETAIL, etc.)
  deal_type?: string; // exact match (RENT, SALE, LEASE)
  status?: string;
  price_currency?: string;
  price_amount?: PriceRange;
  price_duration?: PriceDuration | "";
  price_duration_count?: 1 | 2 | 3 | 4 | 5 | number;
}

export interface NearBy {
  lat?: number;
  lng?: number;
  radius?: number; // in meters
}

export interface SmartSearch {
  description?: string;
}

export interface TextSearch {
  [key: string]: string; // free-form text search object, can extend later
}

export interface SearchRequest {
  searchType: SearchType;
  filters?: Filters;
  nearBy?: NearBy;
  text?: TextSearch;
  smart?: SmartSearch;
}

export interface SearchState {
  searchRequest: SearchRequest;
  loading: boolean;
  error: string | null;
  searchResults: PropertyItem[];
}
