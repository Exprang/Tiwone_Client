import { Locate, Search, SlidersHorizontal, TextSearch } from "lucide-react";
import { useState } from "react";
import { getAccurateUserLocationCached } from "../../utils/userLocation";
import Filter from "./Filter";

function FilterModal() {
  const [showPanel, setShowPanel] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePanel = () => setShowPanel((prev) => !prev);

  const handleLocate = async () => {
    setLoading(true);
    try {
      const location = await getAccurateUserLocationCached();
      const point = `${location.coordinates.lat}, ${location.coordinates.lon}`;
      const displayName = location.address.displayName ?? point;
      setQuery(displayName);
    } catch (err) {
      console.error("Failed to get location:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* --- Top Controls --- */}
      <div className="relative z-20 bg-white rounded-md flex items-center gap-2">
        {/* Filter Button */}
        <button
          onClick={togglePanel}
          className={`rounded-lg h-12 w-12 flex items-center justify-center transition-colors ${
            showPanel ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <SlidersHorizontal
            className={`w-5 h-5 ${
              showPanel ? "text-blue-600" : "text-gray-500"
            }`}
          />
        </button>

        {/* Search Bar (Hidden on small screens) */}
        <div className="hidden md:flex items-center flex-grow border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center px-3 bg-gray-50">
            <TextSearch className="text-gray-500 w-5 h-5 mr-2" />
          </div>
          <input
            type="text"
            placeholder="Search: Place, Keywords..."
            className="flex-grow h-12 px-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 h-12 text-white px-5 flex items-center justify-center transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={togglePanel}
          className={`rounded-lg h-12 w-12 flex md:hidden items-center justify-center transition-colors ${
            showPanel ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Search
            className={`w-5 h-5 ${
              showPanel ? "text-blue-600" : "text-gray-500"
            }`}
          />
        </button>

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

      {/* --- Filter/Search Panel (Below Buttons) --- */}
      {showPanel && (
        <div
          className="absolute top-[120%] w-80 z-10 bg-white rounded-md animate-slideDown 
                  max-h-[80vh] overflow-y-auto"
        >
          <Filter setShowFilterPanel={setShowPanel} />
        </div>
      )}
    </div>
  );
}

export default FilterModal;
