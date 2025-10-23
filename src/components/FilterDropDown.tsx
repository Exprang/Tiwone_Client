import React, { useState } from "react";

interface FilterProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-40 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selected || label}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selected === option ? "font-semibold text-blue-600" : ""
              }`}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
