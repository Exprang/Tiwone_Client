// -------------------
// Hook for consuming
// -------------------
import { createContext, useContext } from "react";
import type { SearchContextProps } from "../contexts/SearchContext";
export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
