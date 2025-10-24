export type Photo = {
  id: number;
  space_profile_id: number;
  photo_url: string;
  created_at: string;
  updated_at: string;
};

export type Feature = {
  id: number;
  space_profile_id: number;
  feature_name: string;
  created_at: string;
  updated_at: string;
};

export type NearbyFeature = {
  id: number;
  space_profile_id: number;
  feature_name: string;
  created_at: string;
  updated_at: string;
};

export type SpaceProfile = {
  id: number;
  space_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  Photos: Photo[];
  Features: Feature[];
  NearbyFeatures: NearbyFeature[];
};

export type Address = {
  id: number;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  created_at: string;
  updated_at: string;
};

export type LocationPoint = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

export type Location = {
  id: number;
  name: string;
  point: LocationPoint;
  created_at: string;
  updated_at: string;
  distance_meters?: number; // optional, can be computed
};

export type PropertyItem = {
  id?: number;
  name: string;
  space_type: string;
  deal_type: string;
  status: string;
  price_amount: string;
  price_currency: string;
  price_duration: string;
  price_duration_count: number;
  address_id?: number;
  location_id?: number;
  created_at?: string;
  updated_at?: string;
  Address?: Address;
  Location?: Location;
  SpaceProfile?: SpaceProfile;
  address?: Address;
  location?: Location;
  space_profile?: SpaceProfile;
};

export interface SpacesState {
  error: string | null;
  loading: boolean;
  spaces: PropertyItem[];
}

export const dealTypeOptions = [
  { label: "All", value: "" },
  { label: "Rent", value: "RENT" },
  { label: "Sale", value: "SALE" },
  { label: "Lease", value: "LEASE" },
];

export const spaceCategoryOptions = [
  { label: "All", value: "" },
  { label: "Residential", value: "RESIDENTIAL" },
  { label: "Commercial", value: "COMMERCIAL" },
  { label: "Farm", value: "FARM" },
  { label: "Apartment", value: "APARTMENT" },
  { label: "Room", value: "ROOM" },
  { label: "Office", value: "OFFICE" },
  { label: "Retail", value: "RETAIL" },
  { label: "Industrial", value: "INDUSTRIAL" },
  { label: "Warehouse", value: "WAREHOUSE" },
  { label: "Hotel", value: "HOTEL" },
  { label: "Hospitality", value: "HOSPITALITY" },
  { label: "Multifamily", value: "MULTIFAMILY" },
  { label: "Mixed Use", value: "MIXED_USE" },
  { label: "Special Purpose", value: "SPECIAL_PURPOSE" },
  { label: "Land", value: "LAND" },
  { label: "Other", value: "OTHER" },
];

export const priceDurationOptions = [
  { label: "All", value: "" },
  { label: "Day", value: "DAY" },
  { label: "Week", value: "WEEK" },
  { label: "Month", value: "MONTH" },
  { label: "Year", value: "YEAR" },
  { label: "One Time", value: "ONE_TIME" },
];

export const priceCurrencyOptions = [
  { label: "All", value: "" },
  { label: "Day", value: "DAY" },
  { label: "Week", value: "WEEK" },
  { label: "Month", value: "MONTH" },
  { label: "Year", value: "YEAR" },
  { label: "One Time", value: "ONE_TIME" },
];

export const priceDurationCountOptions = Array.from({ length: 5 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));
