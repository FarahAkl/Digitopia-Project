import type { changePasswordResponseT } from "../../schema/auth/resetPassword.schema";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import {
  changePasswordErrorResponseSchema,
  changePasswordRequestSchema,
  changePasswordResponseSchema,
  changePasswordSuccessResponseSchema,
  type changePasswordRequestT,
} from "../../schema/auth/changePassword.schema";
import type z from "zod";

export const changePassword = async (
  data: changePasswordRequestT,
): Promise<changePasswordResponseT> => {
  try {
    const validData = changePasswordRequestSchema.parse(data);

    const response = await axiosInstance.post(
      "/api/Auth/ChangePassword",
      validData,
    );

    return changePasswordResponseSchema.parse(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return changePasswordErrorResponseSchema.parse(error.response.data);
    }
    return changePasswordErrorResponseSchema.parse({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export function isChangePasswordError(
  res: changePasswordResponseT,
): res is z.infer<typeof changePasswordErrorResponseSchema> {
  // جرب نعمل parse بالـ success schema
  const check = changePasswordSuccessResponseSchema.safeParse(res);
  return !check.success; // لو فشل → يبقى Error
}