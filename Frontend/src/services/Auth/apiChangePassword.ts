import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import {
  changePasswordErrorResponseSchema,
  changePasswordRequestSchema,
  changePasswordSuccessResponseSchema,
  type changePasswordRequestT,
  type ChangePasswordResultT,
} from "../../schema/auth/changePassword.schema";

export const changePassword = async (
  data: changePasswordRequestT,
): Promise<ChangePasswordResultT> => {
  const validData = changePasswordRequestSchema.parse(data);

  try {
    const response = await axiosInstance.post(
      "/api/Auth/ChangePassword",
      validData,
    );

    if (response.status === 200 || response.status === 201) {
      return {
        ...changePasswordSuccessResponseSchema.parse(response.data),
        ok: true,
      };
    }

    return {
      ...changePasswordErrorResponseSchema.parse({
        message: "Unexpected success status",
      }),
      ok: false,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return {
        ...changePasswordErrorResponseSchema.parse(error.response.data),
        ok: false,
      };
    }
    return {
      ...changePasswordErrorResponseSchema.parse({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      ok: false,
    };
  }
};