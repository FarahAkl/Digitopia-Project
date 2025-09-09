import z from "zod";

export const resetPasswordRequestSchema = z.object({
  email: z.email(),
  token: z.string(),
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

export const resetPasswordErrorResponseSchema = z.object({
  message: z.string(),
});

export const resetPasswordSuccessResponseSchema = z.object({
  message: z.string(),
});

const resetPasswordResponseSchema = z.union([
  resetPasswordSuccessResponseSchema,
  resetPasswordErrorResponseSchema,
]);

export type resetPasswordRequestT = z.infer<typeof resetPasswordRequestSchema>;

export type changePasswordResponseT = z.infer<
  typeof resetPasswordResponseSchema
>;
