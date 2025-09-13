import z from "zod";

export const editProfileRequestSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z
    .string('')
    .regex(/^01[0-9]{9}$/, "Phone number must be a valid Egyptian number")
    .optional(),
  profileImageUrl: z.url().optional(),
  email: z.email().optional(),
  location: z.string().optional(),
});

export const editProfileErrorResponseSchema = z.object({
  message: z.string(),
});

export const editProfileSuccessResponseSchema = z.object({
  message: z.string(),
});

export const editProfileResponseSchema = z.union([
  editProfileErrorResponseSchema,
  editProfileSuccessResponseSchema,
]);

export type editProfileResponseT = z.infer<typeof editProfileResponseSchema>;
export type editProfileRequestT = z.infer<typeof editProfileRequestSchema>;
