import z from "zod";

export const createNotificationRequestSchema = z.object({
  userId: z.number(),
  message: z.string(),
});

export type createNotificationRequestT = z.infer<
  typeof createNotificationRequestSchema
>;

export const notificationSchema = z.object({
  notificationId: z.number(),
  message: z.string(),
  createAt: z.iso.datetime(),
  isRead: z.boolean(),
});

export type notificationT = z.infer<typeof notificationSchema>;
