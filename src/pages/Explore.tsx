import { LayoutList, Map } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MapView from "../features/MapView/MapView";
import ListSpace from "../features/space/ListSpace";
import { getAccurateUserLocationCached } from "../utils/userLocation";
import { useSearch } from "../hooks/useSearchHook";
import type { PropertyItem } from "../types/space";

function Explore() {
  const { setData, searchResults, startSearch, searchRequest } = useSearch();
  const [center, setCenter] = useState<[number, number]>();
  const [spaces, setSpaces] = useState<PropertyItem[]>([]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // safe guard
    hasRun.current = true;

    (async () => {
      try {
        const location = await getAccurateUserLocationCached();
        const { lat, lon } = location.coordinates;
        setData({ lat, lng: lon });
        setCenter([lat, lon]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    startSearch();
  }, [searchRequest, startSearch]);

  useEffect(() => {
    setSpaces(searchResults);
  }, [searchResults]);

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
      {/* Main Content */}
      <div className="fixed left-0 right-0 bottom-0 top-20">
        {/* Mobile: Toggle List/Map */}
        <div className="lg:hidden h-full flex flex-col overflow-y-auto">
          {showMap ? (
            <div className="m-2 h-full">
              {center && searchRequest.nearBy?.radius && (
                <MapView
                  searchResults={spaces}
                  radius={searchRequest?.nearBy?.radius}
                  center={center}
                />
              )}
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
            {center && searchRequest.nearBy?.radius && (
              <MapView
                searchResults={spaces}
                radius={searchRequest?.nearBy?.radius}
                center={center}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
