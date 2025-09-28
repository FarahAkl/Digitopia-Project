import axiosInstance from "../axiosInstance";
import {
  registerRequestSchema,
  registerResponseSchema,
  type registerRequestT,
  type registerResponseT,
} from "../../schema/auth/register.schema";

type RegisterResult =
  | { success: true; data: registerResponseT }
  | { success: false; error: registerResponseT };

export const register = async (
  data: registerRequestT,
): Promise<RegisterResult> => {
  const validData = registerRequestSchema.parse(data);

  const response = await axiosInstance.post("/api/Auth/Register", validData, {
    validateStatus: () => true,
  });

  const parsed = registerResponseSchema.parse(response.data);

  if (response.status >= 200 && response.status < 300) {
    return { success: true, data: parsed };
  } else {
    return { success: false, error: parsed };
  }
};