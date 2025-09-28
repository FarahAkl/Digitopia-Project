import z from "zod";

export const userSuccessResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  location: z.string().nullable(),
  role: z.string(),
  profileImageUrl: z.string().nullable(),
});

export const userErrorResponseSchema = z.object({
  message: z.string().optional().default("Unknown error"),
});

export const userResponseSchema = z.union([
  userSuccessResponseSchema,
  userErrorResponseSchema,
]);

export type UserResponseT = z.infer<typeof userResponseSchema>;
