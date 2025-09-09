import z from "zod";

export const createReportRequestSchema = z.object({
  locationId: z.string(),
  notes: z.string(),
});

export const createReportSuccessResponseSchema = z.object({
  reportId: z.number(),
  reportUrl: z.string(),
  generatedAt: z.iso.datetime(),
  userId: z.number(),
  locationId: z.number(),
  status: z.enum(["At Risk", "Safe", "Warning"]),
  riskPrediction: z.number(),
  recommendations: z.array(z.string()),
});

export const ReportSchema = z.object({
    reportId: z.number(),
    reportUrl: z.string(),
    generatedAt: z.iso.datetime(),
    userId: z.number(),
    locationId:z.number()
})

export const reportsResponseSchema = z.array(ReportSchema)

export type reportT = z.infer<typeof ReportSchema>
export type reportsResponseT = z.infer<typeof reportsResponseSchema>

export const createReportErrorResponseSchema = z.object({
  type: z.url(),
  title: z.string(),
  status: z.number(),
  errors: z.record(z.string(), z.array(z.string())), // key-value (field -> array of errors)
  traceId: z.number(),
});

const createReportResponseSchema = z.union([
  createReportErrorResponseSchema,
  createReportSuccessResponseSchema,
]);

export type createReportRequestT = z.infer<typeof createReportRequestSchema>;
export type createReportResponseT = z.infer<typeof createReportResponseSchema>;
