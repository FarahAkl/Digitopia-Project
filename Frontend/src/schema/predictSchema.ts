import z from "zod";

export const predictRequestSchema = z.object({
  lat: z.float64(),
  lon: z.float64,
});

export const predictSuccessResponseSchema = z.object({
  clicked_point: {
    lat: z.float64(),
    lon: z.float64(),
  },
  nearest_data_point: {
    lat: z.float64(),
    lon: z.float64(),
    distance_km: z.float64(),
  },
  predicted_ndvi: z.float64(),
  desertification_level: z.string(),
  recommendations: z.array(z.string()),
});

export const predictErrorResponseSchema = z.object({
  detail: z.string(),
});

export type predictRequestT = z.infer<typeof predictRequestSchema>