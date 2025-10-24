import { useEffect, useState } from "react";
import {
  X,
  Search,
  TextSearch,
  LocateFixed,
  SlidersHorizontal,
} from "lucide-react"; // ✅ fixed: Locate → LocateFixed
import { getAccurateUserLocationCached } from "../../utils/userLocation";
import Filter from "./Filter";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

function FilterNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [setShowPanel] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsNavOpen(!isNavOpen);

  const FAKE_SUGGESTIONS: Suggestion[] = [
    { display_name: "Lusaka, Zambia", lat: "-15.3875", lon: "28.3228" },
    { display_name: "Kitwe, Zambia", lat: "-12.8024", lon: "28.2132" },
    { display_name: "Ndola, Zambia", lat: "-12.9587", lon: "28.6366" },
    { display_name: "Livingstone, Zambia", lat: "-17.8419", lon: "25.8542" },
    { display_name: "Chingola, Zambia", lat: "-12.5395", lon: "27.8539" },
  ];

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = FAKE_SUGGESTIONS.filter((s) =>
        s.display_name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: Suggestion) => {
    setQuery(item.display_name);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleLocate = async () => {
    setLoading(true);
    try {
      const location = await getAccurateUserLocationCached();
      const point = `${location.coordinates.lat}, ${location.coordinates.lon}`;
      const displayName = location.address?.displayName ?? point;
      setQuery(displayName);
    } catch (err) {
      console.error("Failed to get location:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchBar = () => (
    <div className="flex items-center flex-grow border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center px-3 bg-gray-50">
        <TextSearch className="text-gray-500 w-5 h-5 mr-0" />
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
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleMenu}
        className={`border hover:bg-gray-400 p-2 rounded-sm block lg:hidden ${
          isNavOpen ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <Search
          className={`w-5 h-5 ${isNavOpen ? "text-blue-600" : "text-gray-500"}`}
        />
      </button>

      {/* Desktop */}
      <div className="hidden p-2 rounded-sm lg:flex gap-2">
        <button
          onClick={toggleMenu}
          className={`rounded-lg h-12 w-12 flex items-center justify-center transition-colors ${
            isNavOpen ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <SlidersHorizontal
            className={`w-5 h-5 ${
              isNavOpen ? "text-blue-600" : "text-gray-500"
            }`}
          />
        </button>
        {searchBar()}
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
            <LocateFixed className="text-gray-700 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isNavOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      {/* Off-Canvas Sidebar */}
      <aside
        className={`fixed w-full top-0 right-0 h-full sm:w-[28rem] bg-white shadow-sm z-50 transform transition-transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <span className="font-medium text-gray-800">Search & Filter</span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-sm text-gray-950 hover:bg-gray-100 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main grid: fixed header + scrollable content */}
        <div className="grid grid-rows-[auto_1fr] h-[calc(100vh-64px)]">
          {/* Top section (header/search) */}
          <div className="p-4 bg-white border-b">
            <div className="rounded">
              <div className="relative z-20 bg-white rounded-md flex items-center gap-2">
                <div className="flex w-full">{searchBar()}</div>
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
                    <LocateFixed className="text-gray-700 w-5 h-5" />
                  )}
                </button>
              </div>

              {showDropdown && (
                <div className="mt-4 border border-gray-200 rounded-lg z-30 max-h-60 overflow-y-auto">
                  {loading && (
                    <div className="p-3 text-gray-500 text-sm">Loading...</div>
                  )}
                  {!loading && suggestions.length === 0 && (
                    <div
                      className="p-3 text-gray-500 text-sm cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      No results found (click to close)
                    </div>
                  )}
                  {!loading &&
                    suggestions.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelect(item)}
                        className="p-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b last:border-none"
                      >
                        {item.display_name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto p-4 bg-gray-50">
            <Filter setShowFilterPanel={setShowPanel} />
          </div>
        </div>
      </aside>
    </>
  );
}

export default FilterNav;
