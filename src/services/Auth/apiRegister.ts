import axiosInstance from "../axiosInstance";
import {
  registerRequestSchema,
  registerResponseSchema,
  type registerRequestT,
  type registerResponseT,
} from "../../schema/auth/register.schema";
import { AxiosError } from "axios";

/**
 * Service function to register a new user
 */
export const register = async (
  data: registerRequestT,
): Promise<registerResponseT> => {
  try {
    const validData = registerRequestSchema.parse(data);
    const response = await axiosInstance.post("/api/Auth/Register", validData);
    const parsedResponse = registerResponseSchema.parse(response.data);

    return parsedResponse;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      try {
        const parsedError = registerResponseSchema.parse(error.response.data);
        return parsedError;
      } catch {
        return { message: "An unknown error occurred" };
      }
    }
    return { message: "An unknown error occurred" };
  }
};
