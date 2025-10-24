import React from "react";
import { DollarSign, Building2, Tag } from "lucide-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import { dealTypeOptions, spaceCategoryOptions } from "../../types/space";
import type { SpaceFormState } from "./spaceState";
import type { DealType, SpaceCategory } from "../../types/search";

interface BasicInfoProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Space Title */}
      <InputField
        name="title"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Enter space name (e.g., Premium Office Tower)"
        icon={<Tag className="w-5 h-5 text-gray-500" />}
      />
      {/* Space Category */}
      <SelectField
        name="category"
        value={formData.space_type}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            space_type: e.target.value as SpaceCategory,
          }))
        }
        options={spaceCategoryOptions.slice(1)}
        placeholder="Select space category (e.g., Office, Retail, Warehouse)"
        icon={<Building2 className="w-5 h-5 text-gray-500" />}
      />
      {/* Deal Type */}
      <SelectField
        name="dealType"
        value={formData.deal_type}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            deal_type: e.target.value as DealType,
          }))
        }
        options={dealTypeOptions.slice(1)}
        placeholder="Select deal type (e.g., Rent, Sale)"
        icon={<DollarSign className="w-5 h-5 text-gray-500" />}
      />
    </div>
  );
};

export default BasicInfo;
