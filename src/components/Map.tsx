import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

export default function Map({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords;
  const todayString = new Date()
    .toLocaleDateString("ja-JP", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .split("/")
    .join("");
  const currentHour = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
  });

  const url = `https://weathermaps.weatherapi.com/${mapType}/tiles/${todayString}${currentHour}/{z}/{x}/{y}.png`;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}>
      <MapClick onMapClick={onMapClick} coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer url={url} opacity={0.45} minZoom={1} maxZoom={6} />

      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });
  return null;
}
