import type { changePasswordResponseT } from "../../schema/auth/resetPassword.schema";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import {
  changePasswordErrorResponseSchema,
  changePasswordRequestSchema,
  type changePasswordRequestT,
} from "../../schema/auth/changePassword.schema";

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
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return changePasswordErrorResponseSchema.parse(error.response.data);
    }
    return { message: "Unknown error" };
  }
};
