import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
// import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";
import { predict } from "../services/apiPredict";
import type { predictSuccessT } from "../schema/predict.schema";

export default function Map() {
  // const { cities } = useCities();
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
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <button type="button" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))} */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const [searchParams, setSearchParams] = useSearchParams();

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
