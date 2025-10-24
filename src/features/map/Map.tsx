import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import type { PropertyItem } from "../../types/space";
import { useSearch } from "../../hooks/useSearchHook";

// Fix default Leaflet marker icon for Vite
L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl: iconShadow });

type PropertyMapProps = {
  properties?: PropertyItem[];
  center?: [number, number];
  zoom?: number;
  radius?: number;
};

// -----------------------
// Fit all markers in bounds
// -----------------------
type FitBoundsProps = {
  properties: PropertyItem[];
  userLocation?: [number, number];
  defaultCenter?: [number, number];
  animate?: boolean;
};

export function FitBounds({
  properties,
  userLocation,
  defaultCenter,
  animate = true,
}: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    // collect all points: user + properties
    const points: [number, number][] = [];

    if (userLocation) points.push(userLocation);

    properties.forEach((p) =>
      points.push([
        p.Location.point.coordinates[1],
        p.Location.point.coordinates[0],
      ])
    );

    // fallback to default center if nothing else
    if (points.length === 0 && defaultCenter) points.push(defaultCenter);
    if (points.length === 0) return;

    // create bounds and fit map
    const bounds = L.latLngBounds(points);
    // console.log(points);
    if (points.length > 1) {
      // use fitBounds with padding to show all markers clearly
      map.fitBounds(bounds, { padding: [50, 50] });
      // optionally use smooth flyTo instead
      if (animate) {
        map.flyToBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [properties, userLocation, map, defaultCenter, animate]);

  return null;
}

// -----------------------
// Draggable user location
// -----------------------
type LocationMarkerProps = {
  onPositionChange?: (pos: [number, number]) => void;
  center?: [number, number];
  defaultLocation?: [number, number];
};

function LocationMarker({
  onPositionChange,
  center,
  defaultLocation = [-15.3875, 28.3228],
}: LocationMarkerProps) {
  const [position, setPosition] = useState<L.LatLngLiteral | null>(
    center ? { lat: center[0], lng: center[1] } : null
  );
  const { setData } = useSearch();
  // Initialize marker position
  useEffect(() => {
    if (position) {
      onPositionChange?.([position.lat, position.lng]);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setPosition(loc);
          onPositionChange?.([loc.lat, loc.lng]);
        },
        () => {
          const loc = { lat: defaultLocation[0], lng: defaultLocation[1] };
          setPosition(loc);
          onPositionChange?.([loc.lat, loc.lng]);
        }
      );
    } else {
      const loc = { lat: defaultLocation[0], lng: defaultLocation[1] };
      setPosition(loc);
      onPositionChange?.([loc.lat, loc.lng]);
    }
  }, []);

  // Update position on drag
  const handleDragEnd = async (event: L.DragEndEvent) => {
    const marker = event.target;
    const newPos = marker.getLatLng();
    // Update local state
    setPosition(newPos);
    // Update parent / callback
    onPositionChange?.([newPos.lat, newPos.lng]);

    const newLocation = { lat: newPos.lat, lng: newPos.lng };
    // console.log(newLocation);
    setData(newLocation);
    // startSearch();
  };

  return position ? (
    <Marker
      position={position}
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
    >
      <Tooltip>You are here</Tooltip>
    </Marker>
  ) : null;
}

// -----------------------
// Component to follow user
// -----------------------
function FollowUser({
  userLocation,
}: {
  userLocation: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) map.flyTo(userLocation, map.getZoom());
  }, [userLocation, map]);
  return null;
}

// -----------------------
// Main Property Map
// -----------------------
export default function PropertyMap({
  properties = [],
  center = [-15.3875, 28.3228],
  zoom = 13,
  radius = 1000,
}: PropertyMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const { data } = useSearch();

  const prevData = useRef(data);
  const hasRunThis = useRef(false);

  useEffect(() => {
    if (hasRunThis.current) return;
    if (data && data !== prevData.current) {
      hasRunThis.current = true;
      // startSearch();
    }
    prevData.current = data;
  }, [data]);

  return (
    <div className="h-full w-full overflow-hidden relative rounded-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User marker */}
        <LocationMarker
          center={center}
          defaultLocation={center}
          onPositionChange={setUserLocation}
        />

        {/* Follow user marker dynamically */}
        {userLocation && <FollowUser userLocation={userLocation} />}

        {/* Circle follows user */}
        <Circle
          center={userLocation || center}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.15 }}
          radius={radius}
        />

        {/* Property markers */}
        <MarkerClusterGroup>
          {properties.map((property) => {
            const lat = property.Location.point.coordinates[1];
            const lng = property.Location.point.coordinates[0];
            return (
              <Marker key={property.id} position={[lat, lng]}>
                <Tooltip permanent direction="top">
                  {property.price_amount} {property.price_currency} /{" "}
                  {property.price_duration.toLowerCase()}
                </Tooltip>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

        {/* Fit bounds on initial load */}
        <FitBounds
          properties={properties}
          userLocation={userLocation ?? undefined}
          defaultCenter={center}
          animate={true}
        />
      </MapContainer>
    </div>
  );
}
