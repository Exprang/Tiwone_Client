import React from "react";
import InputField from "../../components/InputField";
import { Building2, MapPin, MapPinned, Earth } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface AddressAndLocationProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
}

const AddressAndLocation: React.FC<AddressAndLocationProps> = ({
  formData,
  setFormData,
}) => {
  const { address } = formData;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Address Details
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        Enter the full address details of the space.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="street"
          placeholder="Street address"
          icon={<MapPinned className="w-5 h-5 text-gray-500" />}
          value={address.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, street: e.target.value },
            }))
          }
        />

        <InputField
          name="city"
          placeholder="City"
          icon={<Building2 className="w-5 h-5 text-gray-500" />}
          value={address.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, city: e.target.value },
            }))
          }
        />

        <InputField
          name="province"
          placeholder="Province"
          icon={<MapPin className="w-5 h-5 text-gray-500" />}
          value={address.province}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, province: e.target.value },
            }))
          }
        />

        {/* Optional Postal Code (uncomment if needed) */}
        {/* <InputField
          name="postalCode"
          placeholder="Postal code"
          icon={<Mailbox className="w-5 h-5 text-gray-500" />}
          value={address.postalCode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, postalCode: e.target.value },
            }))
          }
        /> */}

        <InputField
          name="country"
          placeholder="Country"
          icon={<Earth className="w-5 h-5 text-gray-500" />}
          value={address.country}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, country: e.target.value },
            }))
          }
          disabled
        />
      </div>
    </div>
  );
};

export default AddressAndLocation;
