import type {
  Filters,
  NearBy,
  SearchState,
  SearchType,
  SmartSearch,
  TextSearch,
} from "../types/search";
import type { PropertyItem } from "../types/space";

// Search Action Types
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const START_SEARCH = "START_SEARCH";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const RESET_SEARCH_DATA = "RESET_SEARCH_DATA";

export const initialSearchState: SearchState = {
  searchType: "NEARBY",
  filters: {},
  data: {
    nearBy: {
      lat: -15.4167,
      lng: 28.2833,
      radius: 8000,
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
      payload: {
        searchType?: SearchType;
        filters?: Filters;
        data?: {
          nearBy?: NearBy;
          text?: TextSearch;
          smart?: SmartSearch;
        };
      };
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
      const { searchType, filters, data } = action.payload;

      // Determine which keys to update in `state.data`
      const newData = { ...state.data };
      if (data?.nearBy) newData.nearBy = { ...newData.nearBy, ...data.nearBy };
      if (data?.text) newData.text = { ...newData.text, ...data.text };
      if (data?.smart) newData.smart = { ...newData.smart, ...data.smart };

      return {
        ...state,
        searchType: searchType ?? state.searchType,
        filters: filters ? { ...state.filters, ...filters } : state.filters,
        data: newData,
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
