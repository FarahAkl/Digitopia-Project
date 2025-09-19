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

export type changePasswordRequestT = z.infer<
  typeof changePasswordRequestSchema
>;

export const changePasswordErrorResponseSchema = z.object({
  message: z.string(),
});

export const changePasswordSuccessResponseSchema = z.object({
  message: z.string(),
});
export type changePasswordSuccessT = z.infer<
  typeof changePasswordSuccessResponseSchema
>;

export const changePasswordResponseSchema = z.union([
  changePasswordSuccessResponseSchema,
  changePasswordErrorResponseSchema,
]);

export type changePasswordErrorT = z.infer<
  typeof changePasswordErrorResponseSchema
>;

export type ChangePasswordResultT =
  | ({ ok: true } & changePasswordSuccessT)
  | ({ ok: false } & changePasswordErrorT);
