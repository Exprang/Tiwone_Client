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
  setFilters: (filters: Filters, searchType?: SearchType) => void;
  setData: (
    data: NearBy | TextSearch | SmartSearch,
    searchType?: SearchType
  ) => void;
  startSearch: () => Promise<void>;
  resetSearch: () => void;
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  // Maintain latest state reference for async operations
  const stateRef = useRef(state);
  stateRef.current = state;

  // -----------------------
  // Context Methods
  // -----------------------

  const setSearchType = useCallback(
    (type: SearchType = "NEARBY") =>
      dispatch({ type: SET_SEARCH_DATA, payload: { searchType: type } }),
    []
  );

  const setFilters = useCallback(
    (filters: Filters, searchType: SearchType = "NEARBY") =>
      dispatch({ type: SET_SEARCH_DATA, payload: { searchType, filters } }),
    []
  );

  const setData = useCallback(
    (
      data: Partial<NearBy> | TextSearch | SmartSearch,
      searchType: SearchType = "NEARBY"
    ) => {
      if ("lat" in data || "lng" in data || "radius" in data) {
        // Partial NearBy updates supported
        dispatch({
          type: SET_SEARCH_DATA,
          payload: {
            searchType,
            nearBy: {
              ...stateRef.current.searchRequest.nearBy,
              ...data,
            } as NearBy,
          },
        });
      } else {
        console.warn("Unsupported search type payload. Only NearBy supported.");
      }
    },
    []
  );

  const startSearch = useCallback(async () => {
    dispatch({ type: START_SEARCH });

    try {
      const { searchRequest } = stateRef.current;
      const response = await searchSpaces(searchRequest);

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
