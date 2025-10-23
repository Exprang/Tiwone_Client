import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix for Leaflet default icon not appearing in bundlers
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ListingMapProps {
  latitude: number | string;
  longitude: number | string;
  onCoordinateChange: (lat: number, lon: number) => void;
}

/** Handles marker dragging */
function DraggableMarker({
  position,
  onChange,
}: {
  position: L.LatLngExpression;
  onChange: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    dragend: () => {},
  });

  return (
    <Marker
      draggable
      position={position}
      icon={markerIcon}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const { lat, lng } = marker.getLatLng();
          onChange(lat, lng);
        },
      }}
    />
  );
}

/** Syncs the map center with external coordinate updates (fly animation) */
function FlyToPosition({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();
  const hasFlown = useRef(false);

  useEffect(() => {
    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Prevent repeated flyTo on first render if no coords
      map.flyTo([latitude, longitude], 15, { animate: true, duration: 1 });
      hasFlown.current = true;
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function ListingMap({
  latitude,
  longitude,
  onCoordinateChange,
}: ListingMapProps) {
  const latNum = Number(latitude);
  const lonNum = Number(longitude);
  const isValidCoords =
    !isNaN(latNum) && !isNaN(lonNum) && latNum !== 0 && lonNum !== 0;

  // Default center (only for fallback)
  const defaultCenter: [number, number] = [15.3875, 28.3228]; // Example: Lusaka

  return (
    <div className="h-64 w-full rounded-md overflow-hidden">
      <MapContainer
        center={isValidCoords ? [latNum, lonNum] : defaultCenter}
        zoom={14}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* FlyTo effect when coords change (manual entry / my location) */}
        {isValidCoords && (
          <FlyToPosition latitude={latNum} longitude={lonNum} />
        )}

        <DraggableMarker
          position={isValidCoords ? [latNum, lonNum] : defaultCenter}
          onChange={onCoordinateChange}
        />
      </MapContainer>
    </div>
  );
}
