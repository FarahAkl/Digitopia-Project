import z from "zod";

export const registerRequestSchema = z.object({
  name: z.string(),
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
  phoneNumber: z
    .string()
    .regex(/^01[0-9]{9}$/, "Phone number must be a valid Egyptian number"),
  profileImageUrl: z.url().optional(),
  location: z.string().optional(),
});

export const registerResponseSchema = z.object({
  message: z.string(),
});

export type registerResponseT = z.infer<typeof registerResponseSchema>;
export type registerRequestT = z.infer<typeof registerRequestSchema>;
