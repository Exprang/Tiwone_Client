import type {
  Filters,
  NearBy,
  SearchState,
  SearchType,
  SmartSearch,
  TextSearch,
} from "../types/search";
import type { PropertyItem } from "../types/space";

// Actions
export type SearchAction =
  | { type: "SET_SEARCH_TYPE"; payload: SearchType }
  | { type: "SET_FILTERS"; payload: Filters }
  | {
      type: "SET_DATA";
      payload: { type: SearchType; data: NearBy | TextSearch | SmartSearch };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_RESULTS"; payload: PropertyItem[] }
  | { type: "RESET_SEARCH" };

// Initial state
export const initialSearchState: SearchState = {
  searchType: "NEARBY",
  filters: {},
  data: {
    nearBy: {
      lat: -15.4167, // Lusaka latitude
      lng: 28.2833, // Lusaka longitude
      radius: 60000, // default radius in meters
    },
  },
  loading: false,
  error: null,
  searchResults: [],
};

// Reducer
export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case "SET_DATA": {
      const { type, data } = action.payload;

      // Map the SearchType to the correct key in 'data'
      const key: keyof SearchState["data"] =
        type === "NEARBY" ? "nearBy" : type === "TEXT" ? "text" : "smart";

      return {
        ...state,
        data: {
          ...state.data,
          [key]: data,
        },
      };
    }

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_RESULTS":
      return { ...state, searchResults: action.payload };

    case "RESET_SEARCH":
      return { ...initialSearchState };

    default:
      return state;
  }
}
