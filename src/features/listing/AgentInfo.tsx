import React from "react";
import InputField from "../../components/InputField";
import { User, Mail, Phone } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface AgentInfoProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
}

const AgentInfo: React.FC<AgentInfoProps> = ({ formData, setFormData }) => {
  const handleChange = (
    field: keyof SpaceFormState["space_profile"]["agent"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      space_profile: {
        ...prev.space_profile,
        agent: {
          ...prev.space_profile.agent,
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Agent / Lister Information
        </h2>
        <p className="text-gray-600 text-sm">
          These details are auto-filled from your account profile and can be
          edited if needed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          name="firstName"
          placeholder="First Name"
          icon={<User />}
          value={formData.space_profile.agent.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />
        <InputField
          name="lastName"
          placeholder="Last Name"
          icon={<User />}
          value={formData.space_profile.agent.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
        />
        <InputField
          name="email"
          placeholder="Email"
          icon={<Mail />}
          value={formData.space_profile.agent.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <InputField
          name="phone"
          placeholder="Phone Number"
          icon={<Phone />}
          value={formData.space_profile.agent.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Ensure your contact details are accurate — clients will use this
        information to reach you.
      </p>
    </div>
  );
};

export default AgentInfo;
