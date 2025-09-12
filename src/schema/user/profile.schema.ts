import z from "zod";

export const userSuccessResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  locations: z.array(z.string()),
  role: z.string(),
  profileImageUrl: z.string().optional(),
});

export const userErrorResponseSchema = z.object({
  message: z.string(),
});

export const userResponseSchema = z.union([
  userSuccessResponseSchema,
  userErrorResponseSchema,
]);

export type UserResponseT = z.infer<typeof userResponseSchema>;
