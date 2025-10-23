import { useReducer, type ReactNode, useCallback, useRef } from "react";
import type {
  SearchState,
  SearchType,
  Filters,
  NearBy,
  TextSearch,
  SmartSearch,
} from "../types/search";
import {
  initialSearchState,
  searchReducer,
  SET_ERROR,
  START_SEARCH,
  SET_SEARCH_DATA,
  RESET_SEARCH_DATA,
} from "../reducers/useSearchReducer";
import { SearchContext } from "../hooks/useSearchHook";
import { searchSpaces } from "../api/spaceAPI";

export interface SearchContextProps extends SearchState {
  setSearchType: (type: SearchType) => void;
  setFilters: (filters: Filters) => void;
  setData: (
    data: NearBy | TextSearch | SmartSearch,
    searchType?: SearchType
  ) => void;
  startSearch: () => Promise<void>;
  resetSearch: () => void;
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  // Use ref to always get latest state in async functions
  const stateRef = useRef(state);
  stateRef.current = state;

  // -----------------------
  // Context Methods
  // -----------------------
  const setSearchType = useCallback(
    (type: SearchType) =>
      dispatch({ type: SET_SEARCH_DATA, payload: { searchType: type } }),
    []
  );

  const setFilters = useCallback(
    (filters: Filters) =>
      dispatch({ type: SET_SEARCH_DATA, payload: { filters } }),
    []
  );

  const setData = useCallback(
    (data: NearBy | TextSearch | SmartSearch, searchType?: SearchType) => {
      type PayloadData = {
        nearBy?: NearBy;
        text?: TextSearch;
        smart?: SmartSearch;
      };
      const payloadData: PayloadData = {};

      // Type guards
      if ("lat" in data && "lng" in data) {
        payloadData.nearBy = data as NearBy; // TS knows this is NearBy
      } else if ("query" in data) {
        payloadData.text = data as TextSearch;
      } else {
        payloadData.smart = data as SmartSearch;
      }

      dispatch({
        type: SET_SEARCH_DATA,
        payload: { data: payloadData, searchType },
      });
    },
    []
  );

  const startSearch = useCallback(async () => {
    dispatch({ type: START_SEARCH });

    try {
      const { searchType, filters, data } = stateRef.current;
      const searchInput = { searchType, filters, ...data };
      const response = await searchSpaces(searchInput);

      if (response.success) {
        dispatch({ type: "SET_RESULTS", payload: response.data });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: response.message ?? "Unknown error",
        });
      }
    } catch {
      dispatch({ type: SET_ERROR, payload: "Network error" });
    }
  }, []);

  const resetSearch = useCallback(() => {
    dispatch({ type: RESET_SEARCH_DATA });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        ...state,
        setSearchType,
        setFilters,
        setData,
        startSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
