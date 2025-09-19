import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";
import {
  deleteAccountErrorResponseSchema,
  deleteAccountSuccessResponseSchema,
  type deleteAccountResponseT,
} from "../../schema/auth/delete.schema";

export const deleteAccount = async (): Promise<deleteAccountResponseT> => {
  try {
    const response = await axiosInstance.delete("/api/Auth/DeleteAccount");

    if (response.status === 200 || response.status === 201) {
      return deleteAccountSuccessResponseSchema.parse(response.data);
    }

    return deleteAccountErrorResponseSchema.parse({
      message: "Unexpected success status",
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return deleteAccountErrorResponseSchema.parse(error.response.data);
    }
    return deleteAccountErrorResponseSchema.parse({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
