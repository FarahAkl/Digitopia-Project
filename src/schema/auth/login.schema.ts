import z from "zod";

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z
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

export const loginSuccessResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  token: z.string(),
  role: z.string(),
});

export const loginErorrResponseSchema = z.object({
  message: z.string(),
});

export const loginResponse = z.union([
  loginErorrResponseSchema,
  loginSuccessResponseSchema,
]);

export type loginRequstT = z.infer<typeof loginRequestSchema>;
export type loginResponseT = z.infer<typeof loginResponse>;