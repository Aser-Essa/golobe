import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { HotelType } from "#/lib/types";

type LeafletMapProps = {
  latitude: HotelType["latitude"];
  longitude: HotelType["longitude"];
};

export default function LeafletMap({ latitude, longitude }: LeafletMapProps) {
  if (latitude === null || longitude === null) return null;

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
        className={"aspect-square h-full sm:aspect-auto"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
