import z from "zod";

export const predictRequestSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const predictSuccessResponseSchema = z.object({
  clicked_point: {
    lat: z.number(),
    lon: z.number(),
  },
  nearest_data_point: {
    lat: z.number(),
    lon: z.number(),
    distance_km: z.number(),
  },
  predicted_ndvi: z.number(),
  desertification_level: z.string(),
  recommendations: z.array(z.string()),
});

export const predictErrorResponseSchema = z.object({
  detail: z.string(),
});

export type predictRequestT = z.infer<typeof predictRequestSchema>
export type predictSuccessT = z.infer<typeof predictSuccessResponseSchema>