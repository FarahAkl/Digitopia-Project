import z from "zod";

export const deleteAccountSuccessResponseSchema = z.object({
  message: z.string(),
});

export const deleteAccountErrorResponseSchema = z.object({
  message: z.string(),
});

export const deleteAccountResponseSchema = z.union([
  deleteAccountSuccessResponseSchema,
  deleteAccountErrorResponseSchema,
]);

export type deleteAccountResponseT = z.infer<
  typeof deleteAccountResponseSchema
>;
