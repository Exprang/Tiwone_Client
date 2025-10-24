import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  name: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string | number; value: string | number }[];
  icon?: React.ReactNode;
  error?: string;
  showError?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  icon,
  error,
  showError = true,
}) => {
  return (
    <div className="flex flex-col w-full mb-1 relative">
      <div className="relative">
        {/* Left icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
            {icon}
          </div>
        )}

        {/* Select */}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-10 py-3 border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {/* Placeholder option */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Map options */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Right arrow icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Error message */}
      {error && showError && (
        <div className="text-red-500 text-sm h-6 mt-1 rounded-sm">{error}</div>
      )}
    </div>
  );
};

export default SelectField;
