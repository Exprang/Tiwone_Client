import type { Filters, NearBy, SearchState, SearchType } from "../types/search";
import type { PropertyItem } from "../types/space";

// Search Action Types
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const START_SEARCH = "START_SEARCH";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const RESET_SEARCH_DATA = "RESET_SEARCH_DATA";

export const initialSearchState: SearchState = {
  searchRequest: {
    searchType: "NEARBY",
    filters: {},
    nearBy: {
      lat: -12.4167,
      lng: 28.2833,
      radius: 500,
    },
  },
  loading: false,
  error: null,
  searchResults: [],
};

type SearchAction =
  | { type: typeof SET_LOADING }
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof START_SEARCH }
  | {
      type: typeof SET_SEARCH_DATA;
      payload: Partial<{
        searchType: SearchType;
        filters: Filters;
        nearBy: NearBy;
      }>;
    }
  | { type: typeof RESET_SEARCH_DATA }
  | { type: "SET_RESULTS"; payload: PropertyItem[] };

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, error: null };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case START_SEARCH:
      return { ...state, loading: true, error: null, searchResults: [] };

    case SET_SEARCH_DATA: {
      const { searchType, filters, nearBy } = action.payload;

      // Only update fields that exist in the payload
      const updatedRequest = {
        ...state.searchRequest,
        ...(searchType !== undefined && { searchType }),
        ...(filters !== undefined && { filters }),
        ...(nearBy !== undefined && { nearBy }),
      };

      return {
        ...state,
        searchRequest: updatedRequest,
      };
    }

    case RESET_SEARCH_DATA:
      return { ...initialSearchState };

    case "SET_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
