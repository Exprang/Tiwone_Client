import { useEffect, useState } from "react";
import { Locate, Search, SlidersHorizontal, TextSearch } from "lucide-react";
import { getAccurateUserLocationCached } from "../../utils/userLocation";
import { useSearch } from "../../hooks/useSearchHook";

interface FloaterProps {
  showFilterPanel: boolean;
  setShowFilterPanel: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Floater({
  showFilterPanel,
  setShowFilterPanel,
  query,
  setQuery,
}: // setShowDropdown,
FloaterProps) {
  const [loading, setLoading] = useState(false);
  const { setData, data, startSearch } = useSearch();

  const handleLocate = async () => {
    setLoading(true);
    try {
      const location = await getAccurateUserLocationCached();
      const point = `${location.coordinates.lat}, ${location.coordinates.lon}`;
      const displayName = location.address.displayName ?? point;
      const { lat, lon } = location.coordinates;
      setQuery(displayName);
      setData({ lat, lng: lon });
    } catch (err) {
      console.error("Failed to get location:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startSearch();
  }, [data]);

  const toggleFilter = () => setShowFilterPanel((prev) => !prev);

  return (
    <div className="flex gap-2 items-center rounded-lg p-1 bg-white w-full">
      {/* Filter Button */}
      <button
        onClick={toggleFilter}
        className={`rounded-lg h-12 w-12 flex items-center justify-center transition-colors ${
          showFilterPanel ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <SlidersHorizontal
          className={`w-5 h-5 ${
            showFilterPanel ? "text-blue-600" : "text-gray-500"
          }`}
        />
      </button>

      {/* Search Field */}
      <div className="relative flex items-center flex-grow border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center px-3 bg-gray-50">
          <TextSearch className="text-gray-500 w-5 h-5 mr-2" />
        </div>

        <input
          type="text"
          placeholder="Search: Place, Keywords..."
          className="flex-grow h-12 px-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // onFocus={() => query && setShowDropdown(true)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 h-12 text-white px-5 flex items-center justify-center transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Locate Button */}
      <button
        onClick={handleLocate}
        disabled={loading}
        className={`rounded-lg h-12 w-12 flex items-center justify-center transition-colors ${
          loading
            ? "bg-green-600 hover:bg-green-700 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Locate className="text-gray-700 w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default Floater;
