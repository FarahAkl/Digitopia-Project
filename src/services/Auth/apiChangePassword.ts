import axiosInstance from "../axiosInstance";
import {
  changePasswordErrorResponseSchema,
  changePasswordRequestSchema,
  type changePasswordRequestT,
} from "../../schema/auth/changePassword.schema";
import type { changePasswordResponseT } from "../../schema/auth/resetPassword.schema";

export const changePassword = async (
  data: changePasswordRequestT,
): Promise<changePasswordResponseT> => {
  try {
    const validData = changePasswordRequestSchema.parse(data);

    const response = await axiosInstance.post(
      "/api/Auth/ChangePassword",
      validData,
    );

    return changePasswordErrorResponseSchema.parse(response.data);
  } catch (error: any) {
    if (error.response) {
      return changePasswordErrorResponseSchema.parse(error.response.data);
    }
    return { message: error.message || "Unknown error" };
  }
};