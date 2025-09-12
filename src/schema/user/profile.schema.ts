import z from "zod";

export const userSuccessResponseSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  phoneNumber: z
    .string()
    .regex(/^01[0-9]{9}$/, "Phone number must be a valid Egyptian number")
    .optional(),
  locations: z.array(z.string()).optional(),
  role: z.enum(["user", "admin"]),
  profileImageUrl: z.url().optional(),
});

export const userErrorResponseSchema = z.object({
  message: z.string(),
});

export const userResponseSchema = z.union([
  userSuccessResponseSchema,
  userErrorResponseSchema,
]);

export type UserResponseT = z.infer<typeof userResponseSchema>;