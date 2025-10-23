import * as Yup from "yup";

// Basic Info
export const basicInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Required"),
  space_type: Yup.string()
    .oneOf(["OFFICE", "RETAIL", "WAREHOUSE"])
    .required("Required"),
  deal_type: Yup.string().oneOf(["LEASE", "SALE"]).required("Required"),
  status: Yup.string().oneOf(["AVAILABLE", "OCCUPIED"]).required("Required"),
});

// Pricing
export const pricingSchema = Yup.object().shape({
  price_amount: Yup.number().positive("Must be > 0").required("Required"),
  price_currency: Yup.string().required("Required"),
  price_duration: Yup.string().required("Required"),
  price_duration_count: Yup.number()
    .integer()
    .positive("Must be positive")
    .required("Required"),
});

// Address
export const addressSchema = Yup.object().shape({
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  postal_code: Yup.string(),
  country: Yup.string().required("Required"),
  coordinates: Yup.object().shape({
    lat: Yup.number().required("Latitude required"),
    lng: Yup.number().required("Longitude required"),
  }),
});
