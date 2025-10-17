import { LayoutList, Map } from "lucide-react";
import React, { useState, useEffect } from "react";
import Filter from "../features/Filter";
import MapView from "../features/MapView/MapView";
import ListSpace from "../features/space/ListSpace";

function Explore() {
  // Initialize state from localStorage or default to false
  const [showMap, setShowMap] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showMap") === "true";
    }
    return false;
  });

  // Persist state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("showMap", showMap.toString());
  }, [showMap]);

  return (
    <div className="overflow-hidden">
      {/* Filter Bar */}
      <div className="bg-amber-200 fixed left-0 right-0 h-16 flex items-center px-4">
        <Filter />
      </div>

      {/* Main Content */}
      <div className="fixed left-0 right-0 bottom-0 top-36">
        {/* Mobile: Toggle List/Map */}
        <div className="lg:hidden h-full flex flex-col overflow-hidden">
          {showMap ? (
            <div className="m-4 h-full">
              <MapView />
            </div>
          ) : (
            <ListSpace />
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setShowMap(!showMap)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-[9999]"
          >
            {!showMap ? (
              <Map className="w-5 h-5" />
            ) : (
              <LayoutList className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Desktop: 2-column grid */}
        <div className="hidden lg:grid lg:grid-cols-2 h-full overflow-hidden">
          <div className="w-full h-full grid overflow-y-scroll">
            <ListSpace />
          </div>
          <div className="m-4">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
