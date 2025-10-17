import { useReducer, type ReactNode } from "react";
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
} from "../reducers/useSearchReducer";
// import type { PropertyItem } from "../types/space";
import { SearchContext } from "../hooks/useSearchHook";
import { searchSpaces } from "../api/spaceAPI";

export interface SearchContextProps extends SearchState {
  setSearchType: (type: SearchType) => void;
  setFilters: (filters: Filters) => void;
  setData: (type: SearchType, data: NearBy | TextSearch | SmartSearch) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResults: () => void;
  resetSearch: () => void;
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  // -------------------
  // Convenience methods
  // -------------------
  const setSearchType = (type: SearchType) =>
    dispatch({ type: "SET_SEARCH_TYPE", payload: type });

  const setFilters = (filters: Filters) =>
    dispatch({ type: "SET_FILTERS", payload: filters });

  const setData = (type: SearchType, data: NearBy | TextSearch | SmartSearch) =>
    dispatch({ type: "SET_DATA", payload: { type, data } });

  const setLoading = (loading: boolean) =>
    dispatch({ type: "SET_LOADING", payload: loading });

  const setError = (error: string | null) =>
    dispatch({ type: "SET_ERROR", payload: error });

  const setResults = async () => {
    try {
      const { searchType, filters, data } = state;
      const searchInput = { searchType, filters, ...data };
      const response = await searchSpaces(searchInput);
      if (response.success) {
        console.log(response.data);
        dispatch({ type: "SET_RESULTS", payload: response.data });
      }
    } catch {
      // dispatch({ type: "NETWORK_FAILURE" });
    }
  };

  const resetSearch = () => dispatch({ type: "RESET_SEARCH" });

  return (
    <SearchContext.Provider
      value={{
        ...state,
        setSearchType,
        setFilters,
        setData,
        setLoading,
        setError,
        setResults,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
