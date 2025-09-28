import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lon");

  return [lat, lng];
}
