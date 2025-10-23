interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  direction?: "horizontal" | "vertical";
}

export default function RadioGroup({
  options,
  name,
  value,
  onChange,
  direction = "horizontal",
}: RadioGroupProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${
        direction === "vertical" ? "flex-col" : ""
      }`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            cursor-pointer
            select-none
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            border
            transition-colors
            whitespace-nowrap
            ${
              value === option.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            }
            hover:${value === option.value ? "" : "bg-gray-100"}
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
