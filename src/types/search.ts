import type { PropertyItem } from "./space";

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
  price_duration?: string;
  price_duration_count?: number;
  price_amount?: PriceRange;
}

export interface NearBy {
  lat: number;
  lng: number;
  radius: number; // in meters
}

export interface SmartSearch {
  description?: string;
}

export interface TextSearch {
  [key: string]: string; // free-form text search object, can extend later
}

export type SearchType = "NEARBY" | "TEXT" | "SMART";

export interface SearchRequest {
  searchType: SearchType;
  filters?: Filters;
  nearBy?: NearBy;
  text?: TextSearch;
  smart?: SmartSearch;
}

export interface SearchState {
  searchType: SearchType;
  filters: Filters;
  data: {
    nearBy?: NearBy;
    text?: TextSearch;
    smart?: SmartSearch;
  };
  loading: boolean;
  error: string | null;
  searchResults: PropertyItem[];
}
