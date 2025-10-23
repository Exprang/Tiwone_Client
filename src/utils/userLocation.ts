interface LocationMetadata {
  coordinates: { lat: number; lon: number; accuracy: string };
  movement: { speed: number | null; heading: number | null };
  timestamp: string;
  address: {
    displayName: string | null;
    city: string | null;
    state: string | null;
    stateDistrict: string | null;
    country: string | null;
    countryCode: string | null;
    postcode: string | null;
  };
  raw: any;
}

interface LocationOptions {
  timeoutMs?: number;
  targetAccuracy?: number; // meters
  maxRetries?: number;
  coords?: { lat: number; lon: number }; // optional input coordinates
}

/**
 * Get user's precise location with rich metadata and critical accuracy.
 * - If `coords` provided, only reverse-geocodes them.
 * - Otherwise, retrieves current location from browser with retries.
 */
export async function getAccurateUserLocation({
  timeoutMs = 20000,
  targetAccuracy = 50,
  maxRetries = 1,
  coords,
}: LocationOptions = {}): Promise<LocationMetadata> {
  let latitude: number;
  let longitude: number;
  let accuracy = 0;
  let speed: number | null = null;
  let heading: number | null = null;
  let timestamp: string;

  // If coords are provided, use them directly
  if (coords) {
    latitude = coords.lat;
    longitude = coords.lon;
    accuracy = 0; // unknown
    timestamp = new Date().toISOString();
  } else {
    if (!("geolocation" in navigator)) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    let attempt = 0;
    let bestPosition: GeolocationPosition | null = null;

    const getPosition = (): Promise<GeolocationPosition> =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("Location request timed out")),
          timeoutMs
        );

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            clearTimeout(timer);
            resolve(pos);
          },
          (err) => {
            clearTimeout(timer);
            reject(err);
          },
          { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 0 }
        );
      });

    while (attempt < maxRetries) {
      attempt++;
      try {
        const pos = await getPosition();
        if (
          !bestPosition ||
          pos.coords.accuracy < bestPosition.coords.accuracy
        ) {
          bestPosition = pos;
        }
        if (pos.coords.accuracy <= targetAccuracy) break;
      } catch (err) {
        console.warn(`Geolocation attempt ${attempt} failed:`, err);
      }
    }

    if (!bestPosition) {
      throw new Error("Failed to get a usable location.");
    }

    latitude = bestPosition.coords.latitude;
    longitude = bestPosition.coords.longitude;
    accuracy = bestPosition.coords.accuracy;
    speed = bestPosition.coords.speed ?? null;
    heading = bestPosition.coords.heading ?? null;
    timestamp = new Date(bestPosition.timestamp).toISOString();
  }

  // Reverse-geocode via Nominatim
  const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  const reverseData = await fetch(reverseUrl, {
    headers: { "User-Agent": "YourAppName/1.0 (contact@yourapp.com)" },
  }).then((res) => res.json());

  return {
    coordinates: {
      lat: latitude,
      lon: longitude,
      accuracy: coords ? "unknown" : `${accuracy.toFixed(1)} meters`,
    },
    movement: { speed, heading },
    timestamp,
    address: {
      displayName: reverseData.display_name ?? null,
      city:
        reverseData.address?.city ??
        reverseData.address?.town ??
        reverseData.address?.village ??
        null,
      state: reverseData.address?.state ?? null,
      stateDistrict: reverseData.address?.state_district ?? null,
      country: reverseData.address?.country ?? null,
      countryCode: reverseData.address?.country_code ?? null,
      postcode: reverseData.address?.postcode ?? null,
    },
    raw: reverseData,
  };
}

// ==========================
// cached & memoized wrapper
// ==========================
let cachedLocation: LocationMetadata | null = null;
let pendingPromise: Promise<LocationMetadata> | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getAccurateUserLocationCached(
  options: LocationOptions = {},
  forceRefresh = false
): Promise<LocationMetadata> {
  const now = Date.now();

  // return cached if valid
  if (
    !forceRefresh &&
    cachedLocation &&
    now - new Date(cachedLocation.timestamp).getTime() < CACHE_TTL_MS
  ) {
    return cachedLocation;
  }

  // share pending request if already fetching
  if (pendingPromise) return pendingPromise;

  pendingPromise = getAccurateUserLocation(options)
    .then((loc) => {
      cachedLocation = loc;
      pendingPromise = null;
      return loc;
    })
    .catch((err) => {
      pendingPromise = null;
      throw err;
    });

  return pendingPromise;
}
