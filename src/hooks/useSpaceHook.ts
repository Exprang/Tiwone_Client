import { createContext, useContext } from "react";
import type { SpaceContextType } from "../contexts/SpaceContext";
export const SpaceContext = createContext<SpaceContextType | undefined>(
  undefined
);

export function useSpace() {
  const context = useContext(SpaceContext);
  if (context === undefined) {
    throw new Error("useSpace must be used within a SpaceProvider");
  }
  return context;
}
