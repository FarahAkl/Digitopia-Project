import { useState } from "react";
import { useSearchParams } from "react-router";

type GeoPosition = {
  lat: number;
  lng: number;
};

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<GeoPosition | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);
  const [,setSearchParams] = useSearchParams();

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition({ lat, lng });
        setSearchParams({
          lat: lat.toString(),
          lon: lng.toString(),
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}
