//

// import { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Tooltip,
//   useMapEvents,
//   Circle,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import type { PropertyItem } from "../../types/space";

// // Fix default icon for Vite
// L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl: iconShadow });

// interface PropertyMapProps {
//   properties?: PropertyItem[];
//   center?: [number, number];
//   zoom?: number;
//   radius?: number;
// }

// function LocationMarker({
//   onPositionChange,
// }: {
//   onPositionChange?: (pos: L.LatLng) => void;
// }) {
//   const [position, setPosition] = useState<L.LatLngLiteral | null>(null);

//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//       if (onPositionChange) onPositionChange(e.latlng);
//     },
//   });

//   const handleDragEnd = (event: L.DragEndEvent) => {
//     const marker = event.target;
//     const newPos = marker.getLatLng();
//     setPosition(newPos);
//     if (onPositionChange) onPositionChange(newPos);
//   };

//   return position ? (
//     <Marker
//       position={position}
//       draggable
//       eventHandlers={{ dragend: handleDragEnd }}
//     >
//       <Tooltip>You are here</Tooltip>
//     </Marker>
//   ) : null;
// }

// export default function PropertyMap({
//   properties = [], // default empty array
//   center = [-15.3875, 28.3228],
//   zoom = 13,
//   radius = 2000,
// }: PropertyMapProps) {
//   return (
//     <div className="h-[80vh] w-full rounded-2xl shadow-md overflow-hidden">
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         scrollWheelZoom
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Draggable user marker */}
//         <LocationMarker />

//         {/* Optional area circle */}
//         <Circle
//           center={center}
//           pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.3 }}
//           radius={radius}
//         />

//         {/* Clustered property markers */}
//         {properties.length > 0 && (
//           <MarkerClusterGroup>
//             {properties.map((property) => (
//               <Marker key={property.id} position={property.Location.point}>
//                 <Tooltip permanent direction="top">
//                   {property.price_amount}
//                 </Tooltip>
//               </Marker>
//             ))}
//           </MarkerClusterGroup>
//         )}
//       </MapContainer>
//     </div>
//   );
// }

//

//

// import { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Tooltip,
//   useMapEvents,
//   Circle,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Correct CSS imports for clustering
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// // --- Leaflet default icon fix for Vite ---
// L.Marker.prototype.options.icon = L.icon({
//   iconUrl,
//   shadowUrl: iconShadow,
// });

// const fillBlueOptions = { color: "blue", fillColor: "blue", fillOpacity: 0.3 };

// // Simulated properties
// const properties = [
//   { id: 1, lat: -15.387, lng: 28.322, price: "$120,000" },
//   { id: 2, lat: -15.389, lng: 28.325, price: "$150,000" },
//   { id: 3, lat: -15.385, lng: 28.319, price: "$90,000" },
//   { id: 4, lat: -15.386, lng: 28.321, price: "$200,000" },
//   { id: 5, lat: -15.388, lng: 28.318, price: "$130,000" },
//   { id: 6, lat: -15.384, lng: 28.324, price: "$170,000" },
//   { id: 7, lat: -15.39, lng: 28.323, price: "$160,000" },
//   { id: 8, lat: -15.3875, lng: 28.327, price: "$145,000" },
//   { id: 9, lat: -15.383, lng: 28.32, price: "$110,000" },
//   { id: 10, lat: -15.386, lng: 28.319, price: "$95,000" },
//   { id: 11, lat: -15.389, lng: 28.321, price: "$180,000" },
//   { id: 12, lat: -15.3855, lng: 28.326, price: "$155,000" },

//   // 6 more far properties
//   { id: 13, lat: -15.4, lng: 28.34, price: "$210,000" },
//   { id: 14, lat: -15.41, lng: 28.35, price: "$220,000" },
//   { id: 15, lat: -15.395, lng: 28.36, price: "$190,000" },
//   { id: 16, lat: -15.42, lng: 28.33, price: "$230,000" },
//   { id: 17, lat: -15.43, lng: 28.31, price: "$250,000" },
//   { id: 18, lat: -15.415, lng: 28.3, price: "$240,000" },
//   { id: 19, lat: -15.515, lng: 28.3, price: "$240,000" },
// ];

// function LocationMarker() {
//   const [position, setPosition] = useState<L.LatLngLiteral | null>(null);

//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   const handleDragEnd = (event: L.DragEndEvent) => {
//     const marker = event.target;
//     const newPos = marker.getLatLng();
//     setPosition(newPos);
//   };

//   return position ? (
//     <Marker
//       position={position}
//       draggable
//       eventHandlers={{ dragend: handleDragEnd }}
//     >
//       <Popup>You are here</Popup>
//     </Marker>
//   ) : null;
// }

// export default function Map() {
//   return (
//     <div className="h-[80vh] w-full rounded-2xl shadow-md overflow-hidden">
//       <MapContainer
//         center={[-15.3875, 28.3228]}
//         zoom={13}
//         scrollWheelZoom
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Draggable user marker */}
//         <LocationMarker />

//         {/* Area circle */}
//         <Circle
//           center={[-15.3875, 28.3228]}
//           pathOptions={fillBlueOptions}
//           radius={2000}
//         />

//         {/* Clustered property markers */}
//         <MarkerClusterGroup>
//           {properties.map((property) => (
//             <Marker key={property.id} position={[property.lat, property.lng]}>
//               <Tooltip permanent direction="top">
//                 {property.price}
//               </Tooltip>
//             </Marker>
//           ))}
//         </MarkerClusterGroup>
//       </MapContainer>
//     </div>
//   );
// }
