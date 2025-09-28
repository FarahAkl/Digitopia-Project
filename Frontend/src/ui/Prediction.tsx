import type { predictSuccessT } from "../schema/predict.schema";

interface Iprops {
  data: predictSuccessT | null;
  loading: boolean;
  error: string | null;
}

export default function Prediciton({ data, loading, error }: Iprops) {
  return (
    <div
      className={`absolute top-20 left-14 z-[2000] rounded ${(data || error || loading) && "p-3"} shadow ${error ? "bg-red-100" : "bg-amber-50"}`}
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
  );
}
