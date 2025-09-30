import type { predictSuccessT } from "../schema/predict.schema";

interface Iprops {
  data: predictSuccessT | null;
  loading: boolean;
  error: string | null;
  onClose: () => void; 
}

export default function Prediction({ data, loading, error, onClose }: Iprops) {
  if (!data && !loading && !error) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative w-[400px] max-w-[90%] rounded-2xl p-6 shadow-lg ${
          error ? "bg-red-100" : "bg-amber-50"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {loading && (
          <p className="text-center text-gray-700">⏳ Loading prediction...</p>
        )}

        {error && (
          <p className="text-center font-semibold text-red-600">❌ {error}</p>
        )}

        {data && (
          <div className="space-y-3 text-green-900">
            <p>
              <strong>NDVI:</strong> {data.predicted_ndvi}
            </p>
            <p>
              <strong>Desertification:</strong> {data.desertification_level}
            </p>
            <div>
              <strong>Recommendations:</strong>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {data.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
