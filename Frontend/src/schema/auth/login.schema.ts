import z from "zod";

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
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

export const loginResponseSchema = z.union([
  loginErorrResponseSchema,
  loginSuccessResponseSchema,
]);

export type loginRequestT = z.infer<typeof loginRequestSchema>;
export type loginResponseT = z.infer<typeof loginResponseSchema>;
