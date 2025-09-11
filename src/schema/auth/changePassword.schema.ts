import z from "zod";

export const changePasswordRequestSchema = z.object({
  email: z.email(),
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const changePasswordErrorResponseSchema = z.object({
  message: z.string(),
});

export const changePasswordSuccessResponseSchema = z.object({
  message: z.string(),
});

export const changePasswordResponseSchema = z.union([
  changePasswordSuccessResponseSchema,
  changePasswordErrorResponseSchema,
]);

export type changePasswordRequestT = z.infer<
  typeof changePasswordRequestSchema
>;

export type changePasswordResponseT = z.infer<
  typeof changePasswordResponseSchema
>;
