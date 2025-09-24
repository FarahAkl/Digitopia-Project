import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";
import { predict } from "../services/apiPredict";
import type { predictSuccessT } from "../schema/predict.schema";
import Header from "../ui/Header";

export default function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([30, 0]);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<predictSuccessT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useURLPosition();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchPrediction = async () => {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const result = await predict({
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        });

        setData(result);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [lat, lon]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className="relative h-screen flex-1">
      <Header />
      {!geolocationPosition && (
        <button
          type="button"
          onClick={getPosition}
          className="bg-primary rounded-medium absolute bottom-5 left-1/2 z-[1000] -translate-x-1/2 cursor-pointer px-6 py-3 text-xl font-semibold text-amber-50 uppercase"
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
      <div
        className={`absolute top-5 left-5 z-[2000] rounded p-3 shadow ${error ? "bg-red-100" : "bg-amber-50"}`}
      >
        {loading && <p>⏳ Loading prediction...</p>}
        {error && <p className="text-red-500">❌ {error}</p>}
        {data && (
          <div className="text-green-900">
            <p>
              <strong>NDVI:</strong> {data.predicted_ndvi}
            </p>
            <p>
              <strong>Desertification:</strong> {data.desertification_level}
            </p>
            <ul className="list-disc pl-5">
              {data.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const [, setSearchParams] = useSearchParams();

  useMapEvents({
    click: (e) => {
      setSearchParams({
        lat: e.latlng.lat.toString(),
        lon: e.latlng.lng.toString(),
      });
    },
  });
  return null;
}
