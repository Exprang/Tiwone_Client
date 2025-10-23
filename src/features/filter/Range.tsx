import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useUser } from "../../hooks/useAuth";

interface DistanceSliderProps {
  userStatus: "PUBLIC" | "ONBOARD_FREE" | "PAID";
  value: number; // controlled value from parent (in km)
  onChange: (value: number) => void;
}

function DistanceSlider({ userStatus, value, onChange }: DistanceSliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null);

  // Determine max based on user status
  const maxRadiusMap = {
    PUBLIC: 1.5,
    ONBOARD_FREE: 5,
    PAID: 10,
  };

  const maxAllowed = maxRadiusMap[userStatus];
  const absoluteMax = 10; // for visualization

  const handleChange = (val: number) => {
    // Enforce max allowed
    if (val <= maxAllowed) {
      onChange(val);
    } else {
      onChange(maxAllowed);
    }
  };

  // Dynamic gradient for slider
  const getSliderBackground = () => {
    const percent = (value / absoluteMax) * 100;
    const allowedPercent = (maxAllowed / absoluteMax) * 100;
    return `linear-gradient(to right, #3b82f6 ${percent}%, #93c5fd ${percent}% ${allowedPercent}%, #e5e7eb ${allowedPercent}%)`;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Labels */}
      <div className="flex justify-between text-sm text-gray-500 font-medium">
        <span>0.5 km</span>
        <span>10 km</span>
      </div>

      {/* Slider */}
      <div className="relative w-full">
        <input
          ref={sliderRef}
          type="range"
          min={0.5}
          max={absoluteMax}
          step={0.1}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full h-4 rounded-lg appearance-none cursor-pointer"
          style={{ background: getSliderBackground() }}
        />
        {/* Tooltip */}
        <div
          className="absolute -top-7 text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded shadow"
          style={{ left: `calc(${(value / absoluteMax) * 100}% - 16px)` }}
        >
          {value.toFixed(1)} km
        </div>
      </div>

      {/* Max allowed info */}
      <div className="text-right text-sm font-medium text-gray-600">
        Max allowed: {maxAllowed} km{" "}
        {userStatus === "PUBLIC" && (
          <span className="text-blue-600 font-semibold cursor-pointer">
            <Link to="/signin">[Signin to increase]</Link>
          </span>
        )}
        {userStatus === "ONBOARD_FREE" && (
          <span className="text-blue-600 font-semibold cursor-pointer">
            <Link to="/#">[Upgrade to increase]</Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default DistanceSlider;
