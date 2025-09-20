import {
  predictErrorResponseSchema,
  predictRequestSchema,
  predictSuccessResponseSchema,
  type predictRequestT,
  type predictSuccessT,
} from "../schema/predict.schema";

export async function predict(body: predictRequestT): Promise<predictSuccessT> {
  // ✅ validate request before sending
  const parsed = predictRequestSchema.parse(body);

  const response = await fetch(
    "https://radwaamr1-desertification-api.hf.space/predict-by-location",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const errData = predictErrorResponseSchema.parse(data);
    throw new Error(errData.detail);
  }

  // ✅ validate success response
  return predictSuccessResponseSchema.parse(data);
}
