import z from "zod";
import { userSuccessResponseSchema } from "../user/profile.schema";

export const usersSuccessResponse = z.array(userSuccessResponseSchema);

export type UsersSuccessResponseT = z.infer<typeof usersSuccessResponse>;
