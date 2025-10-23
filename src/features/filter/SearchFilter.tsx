import { useState, useEffect } from "react";
import Floater from "./Floater";
import Filter from "./Filter";
import { createPortal } from "react-dom";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

function SearchFilter() {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 💡 Fake dataset (mock Nominatim)
  const FAKE_SUGGESTIONS: Suggestion[] = [
    { display_name: "Lusaka, Zambia", lat: "-15.3875", lon: "28.3228" },
    { display_name: "Kitwe, Zambia", lat: "-12.8024", lon: "28.2132" },
    { display_name: "Ndola, Zambia", lat: "-12.9587", lon: "28.6366" },
    { display_name: "Livingstone, Zambia", lat: "-17.8419", lon: "25.8542" },
    { display_name: "Chingola, Zambia", lat: "-12.5395", lon: "27.8539" },
  ];

  // 🧠 Debounced mock search
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
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: Suggestion) => {
    setQuery(item.display_name);
    setSuggestions([]);
    setShowDropdown(false);
    // console.log("Selected mock location:", item);
  };

  return (
    <div className="rounded-lg">
      <div className="grid items-center overflow-hidden">
        <Floater
          showFilterPanel={showFilterPanel}
          setShowFilterPanel={setShowFilterPanel}
          query={query}
          setQuery={setQuery}
          setShowDropdown={setShowDropdown}
        />
      </div>

      {showDropdown && (
        <div className="absolute top-[105%] left-0 right-0 bg-white border border-gray-200 rounded-lg z-50 max-h-60 overflow-y-auto mx-15.5">
          {loading && (
            <div className="p-3 text-gray-500 text-sm">Loading...</div>
          )}

          {!loading && suggestions.length === 0 && (
            <div
              className="p-3 text-gray-500 text-sm"
              onClick={() => {
                setShowDropdown(false);
              }}
            >
              No results found. (click to close)
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

      {/* Filter Panel */}

      <div className="absolute z-10 bg-white w-full grid rounded-lg overflow-auto">
        {showFilterPanel && <Filter setShowFilterPanel={setShowFilterPanel} />}
      </div>
    </div>
  );
}

export default SearchFilter;
