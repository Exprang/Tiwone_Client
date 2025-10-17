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
  id: number;
  name: string;
  space_type: string;
  deal_type: string;
  status: string;
  price_amount: string;
  price_currency: string;
  price_duration: string;
  price_duration_count: number;
  address_id: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  Address: Address;
  Location: Location;
  SpaceProfile: SpaceProfile;
};
