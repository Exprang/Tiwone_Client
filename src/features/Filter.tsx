import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, DollarSign, Home, Calendar, Layers } from "lucide-react";

interface PriceAmount {
  gte: number;
  lte: number;
}

interface Filters {
  name: string;
  space_type: string;
  deal_type: string;
  status: string;
  price_currency: string;
  price_duration: string;
  price_duration_count: string;
  radius: number;
  price_amount: PriceAmount;
}

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<Filters>({
    name: "All",
    space_type: "",
    deal_type: "",
    status: "",
    price_currency: "",
    price_duration: "",
    price_duration_count: "",
    radius: 1000,
    price_amount: { gte: 100, lte: 2500000 },
  });

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field: keyof Filters, value: any) => {
    if (field === "price_amount") {
      setFilters((prev) => ({
        ...prev,
        price_amount: { ...prev.price_amount, ...value },
      }));
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const panel = (
    <div className="fixed inset-0 flex justify-end z-[9999]">
      {/* Drawer */}
      <div
        ref={panelRef}
        className="relative bg-white w-96 max-w-full h-full shadow-xl p-6 overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Filter Properties
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Space Name */}
          <div className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-blue-50">
            <Home size={18} className="text-blue-500" />
            <input
              type="text"
              placeholder="All"
              value={filters.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full outline-none bg-transparent text-blue-900 placeholder-blue-400"
            />
          </div>

          {/* Space Type */}
          <div className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 bg-green-50">
            <Layers size={18} className="text-green-500" />
            <select
              value={filters.space_type}
              onChange={(e) => handleChange("space_type", e.target.value)}
              className="w-full outline-none bg-transparent text-green-900"
            >
              <option value="">Space Type</option>
              <option value="APARTMENT">Apartment</option>
              <option value="OFFICE">Office</option>
              <option value="RETAIL">Retail</option>
            </select>
          </div>

          {/* Deal Type */}
          <div className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500 bg-yellow-50">
            <DollarSign size={18} className="text-yellow-500" />
            <select
              value={filters.deal_type}
              onChange={(e) => handleChange("deal_type", e.target.value)}
              className="w-full outline-none bg-transparent text-yellow-900"
            >
              <option value="">Deal Type</option>
              <option value="RENT">Rent</option>
              <option value="SALE">Sale</option>
              <option value="LEASE">Lease</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-red-600">
              Price Range ({filters.price_currency || "ZMW"})
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.price_amount.gte}
                onChange={(e) =>
                  handleChange("price_amount", { gte: Number(e.target.value) })
                }
                className="w-1/2 border rounded px-2 py-1 focus:ring-2 focus:ring-red-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.price_amount.lte}
                onChange={(e) =>
                  handleChange("price_amount", { lte: Number(e.target.value) })
                }
                className="w-1/2 border rounded px-2 py-1 focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Radius Slider */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-teal-600">
              Radius: {filters.radius} km
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={filters.radius}
              onChange={(e) => handleChange("radius", Number(e.target.value))}
              className="w-full accent-teal-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => {
              console.log("Filters applied:", filters);
              setIsOpen(false);
            }}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Filter Button / CTA */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition focus:outline-none relative z-50 flex items-center gap-2"
      >
        <Layers size={18} /> Filter
      </button>

      {isOpen && createPortal(panel, document.body)}
    </>
  );
}
