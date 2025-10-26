import type { PropertyItem } from "../../types/space";
import PropertyMap from "../map/Map";

interface MapViewInterface {
  searchResults: PropertyItem[];
  center: [lat: number, lng: number];
  radius: number;
}
function MapView({ searchResults, center, radius }: MapViewInterface) {
  return (
    <PropertyMap
      properties={searchResults}
      center={center}
      radius={radius}
      zoom={14}
    />
  );
}

export default MapView;
