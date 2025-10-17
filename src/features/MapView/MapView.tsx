import { useEffect, useMemo, useState } from "react";
import PropertyMap from "../map/Map";
import type { PropertyItem } from "../../types/space";
import { useSearch } from "../../hooks/useSearchHook";

export default function MapView() {
  const { data, searchResults, loading, error, setResults } = useSearch();

  const [userLocation, setUserLocation] = useState<[number, number]>([
    -15.3875,
    28.3228, // default → Lusaka
  ]);

  // ---------------------------
  // 1️⃣ Efficient location fetch (run once)
  // ---------------------------
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        // fallback already handled by default
      },
      { enableHighAccuracy: true, timeout: 5000 } // <— reduce waiting time
    );
  }, []);

  // ---------------------------
  // 2️⃣ Initial Search trigger
  // ---------------------------
  useEffect(() => {
    const fetchResults = async () => {
      if (setResults) {
        setResults();
      }
    };
    fetchResults();
  }, []);

  // ---------------------------
  // 3️⃣ Memoized data to avoid re-renders
  // ---------------------------
  const properties = useMemo<PropertyItem[]>(() => {
    return searchResults ?? [];
  }, [searchResults]);

  // ---------------------------
  // 4️⃣ Dynamic map center — prioritize search area > user
  // ---------------------------
  const mapCenter = useMemo<[number, number]>(() => {
    const near = data?.nearBy;
    return near?.lat && near?.lng ? [near.lat, near.lng] : userLocation;
  }, [data?.nearBy, userLocation]);

  // ---------------------------
  // 5️⃣ Edge case handling
  // ---------------------------
  if (loading && properties.length === 0) {
    return (
      <div className="p-4 text-gray-500">Fetching nearby properties...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded">
        Failed to load properties: {error}
      </div>
    );
  }

  // ---------------------------
  // ✅ Render
  // ---------------------------
  return (
    <>
      {loading && (
        <div className="absolute top-2 left-2 z-50 p-2 bg-white rounded shadow">
          Updating map...
        </div>
      )}

      <PropertyMap
        properties={properties}
        center={mapCenter}
        radius={data?.nearBy?.radius}
        zoom={14}
      />
    </>
  );
}
