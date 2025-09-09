import z from "zod";

const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const loginSuccessResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  token: z.string(),
  role: z.string(),
});

const loginErorrResponseSchema = z.object({
  message: z.string(),
});

const loginResponse = z.union([
  loginErorrResponseSchema,
  loginSuccessResponseSchema,
]);

export type loginRequstT = z.infer<typeof loginRequestSchema>;
export type loginResponseT = z.infer<typeof loginResponse>;
export type loginErorrResponseT = z.infer<typeof loginErorrResponseSchema>;
export type loginSuccessResponseT = z.infer<typeof loginSuccessResponseSchema>;

export {
  loginResponse,
  loginErorrResponseSchema,
  loginSuccessResponseSchema,
  loginRequestSchema,
};
