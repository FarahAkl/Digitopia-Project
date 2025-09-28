import { AxiosError } from "axios";
import {
  userResponseSchema,
  type UserResponseT,
} from "../../schema/user/profile.schema";
import axiosInstance from "../axiosInstance";

export const profileData = async (): Promise<UserResponseT> => {
  try {
    const response = await axiosInstance.get("/api/User/Profile");

    return userResponseSchema.parse(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch profile");
    }

    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred",
    );
  }
};
