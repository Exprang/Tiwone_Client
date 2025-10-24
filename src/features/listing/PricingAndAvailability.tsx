import React from "react";
import { Clock, Coins, CalendarClock, Scale, Landmark } from "lucide-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import {
  priceDurationCountOptions,
  priceDurationOptions,
} from "../../types/space";
import type { SpaceFormState } from "./spaceState";

interface PricingAndAvailabilityProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
}

const PricingAndAvailability: React.FC<PricingAndAvailabilityProps> = ({
  formData,
  setFormData,
}) => {
  const { price, status } = formData;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 grid-cols-5">
        {/* Currency (fixed) */}
        <div className="col-span-2">
          <InputField
            name="currency"
            placeholder="Currency"
            icon={<Landmark className="w-5 h-5 text-gray-500" />}
            value={price.price_currency}
            disabled
            showError={false}
          />
        </div>

        {/* Price */}
        <div className="col-span-3">
          <InputField
            name="amount"
            placeholder="Enter price"
            icon={<Coins className="w-5 h-5 text-gray-500" />}
            value={price.price_amount.toString() || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: {
                  ...prev.price,
                  price_amount: Number(e.target.value) || "",
                },
              }))
            }
            type="number"
            showError={false}
          />
        </div>
      </div>

      {/* Duration */}
      <SelectField
        name="duration"
        value={price.price_duration}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            price_duration: { ...prev.price, price_duration: e.target.value },
          }))
        }
        options={priceDurationOptions.slice(1)}
        placeholder="Select duration (e.g., per month)"
        icon={<CalendarClock className="w-5 h-5 text-gray-500" />}
      />

      {/* Multiplier */}
      {(price.price_duration === "MONTH" ||
        price.price_duration === "YEAR") && (
        <SelectField
          name="durationCount"
          value={Number(price.price_duration_count) || 1} // always a number
          onChange={(e) => {
            const count = Number(e.target.value) || 1; // ensure a number fallback
            setFormData((prev) => ({
              ...prev,
              price: {
                ...prev.price,
                price_duration_count: count,
              },
            }));
          }}
          options={priceDurationCountOptions.slice(1)}
          placeholder="Select multiplier (e.g., 3 months)"
          icon={<Scale className="w-5 h-5 text-gray-500" />}
        />
      )}

      {/* Status */}
      <InputField
        name="status"
        placeholder="Status"
        icon={<Clock className="w-5 h-5 text-gray-500" />}
        value={status}
        disabled
        showError={false}
      />
    </div>
  );
};

export default PricingAndAvailability;
