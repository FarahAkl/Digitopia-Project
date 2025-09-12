import z from "zod";

export const forgetPasswordRequestSchema = z.object({
  email: z.email(),
});

export const forgetPasswordErrorResponseSchema = z.object({
  message: z.string(),
});

export const forgetPasswordSuccessResponseSchema = z.object({
  message: z.string(),
});

export const forgetPasswordResponseSchema = z.union([
  forgetPasswordSuccessResponseSchema,
  forgetPasswordErrorResponseSchema,
]);

export type forgetPasswordRequestT = z.infer<
  typeof forgetPasswordRequestSchema
>;

export type forgetPasswordResponseT = z.infer<
  typeof forgetPasswordResponseSchema
>;
