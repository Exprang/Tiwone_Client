import { z } from "zod";
const steps: { name: string; purpose: string }[] = [
  {
    name: "Basic Info",
    purpose:
      "Define the core details of the space — including its name, type, deal category, and current status — to establish a clear identity for the listing.",
  },
  {
    name: "Pricing & Availability",
    purpose:
      "Specify pricing structure, currency, and lease duration details to accurately represent financial terms and availability timelines.",
  },
  {
    name: "Address",
    purpose:
      "Capture the physical address, city, and province information for accurate mapping and client search relevance.",
  },
  {
    name: "Location",
    purpose:
      "Set the precise coordinates or map point for geolocation accuracy, enabling location-based discovery and AI-generated insights.",
  },
  {
    name: "Space Profile",
    purpose:
      "Provide a detailed overview of the property — including description, key features, and nearby amenities — to enhance discoverability and engagement.",
  },
  {
    name: "Files & Media",
    purpose:
      "Upload photos, videos, or documents to visually represent the space and increase listing credibility and conversion potential.",
  },
  {
    name: "Agent Info",
    purpose:
      "Assign the responsible agent, including their contact information, to ensure smooth communication and lead management.",
  },
];

export default steps;

// Step 0: Basic Info
export const BasicInfoSchema = z.object({
  spaceName: z.string().min(3, "Space name required"),
  spaceCategory: z.string().nonempty("Category required"),
  dealType: z.string().nonempty("Deal type required"),
});

// Step 1: Pricing
export const PricingAndAvailabilitySchema = z.object({
  price: z.string().min(1, "Price required"),
  duration: z.string().nonempty("Duration required"),
  multiplier: z.string().optional(),
});

// Step 2: Address & Location Details
export const AddressAndLocationSchema = z.object({
  street: z.string().nonempty("Street is required"),
  city: z.string().nonempty("City is required"),
  province: z.string().nonempty("Province is required"),
  country: z.string().nonempty("Country is required"),
});

// Step 3: Location (Coordinates)
export const LocationSchema = z.object({
  latitude: z.string().nonempty("Latitude is required"),
  longitude: z.string().nonempty("Longitude is required"),
});

// Step 4: Space Profile
export const SpaceProfileSchema = z.object({
  features: z.string().optional(),
  nearbyFeatures: z.string().optional(),
  description: z.string().min(10, "Description too short"),
});

// Step 5: Media
export const MediaSchema = z.object({
  mediaFiles: z.array(z.string()).optional(),
});

// Step 6: Agent Info
export const AgentInfoSchema = z.object({
  agentName: z.string().min(3, "Name required"),
  agentEmail: z.string().email("Invalid email"),
  agentPhone: z.string().min(6, "Invalid phone number"),
});

// ✅ Global schema (aligned with step order)
export const SpaceFormSchema = BasicInfoSchema.merge(
  PricingAndAvailabilitySchema
)
  .merge(AddressAndLocationSchema)
  .merge(LocationSchema)
  .merge(SpaceProfileSchema)
  .merge(MediaSchema)
  .merge(AgentInfoSchema);

// TypeScript type
export type SpaceFormData = z.infer<typeof SpaceFormSchema>;
