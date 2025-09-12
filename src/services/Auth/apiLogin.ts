import axiosInstance from "../axiosInstance";
import {
  loginResponseSchema,
  type loginRequestT,
  type loginResponseT,
} from "../../schema/auth/login.schema";
import { deleteCookie, setCookie } from "../../utils/TS-Cookie";
import { AxiosError } from "axios";
import {
  forgetPasswordRequestSchema,
  forgetPasswordResponseSchema,
  type forgetPasswordRequestT,
  type forgetPasswordResponseT,
} from "../../schema/auth/forgetPassword.schema";

export const login = async (
  loginData: loginRequestT,
): Promise<loginResponseT> => {
  try {
    const response = await axiosInstance.post("/api/Auth/Login", loginData);
    const data = loginResponseSchema.parse(response.data);
    if ("token" in data) {
      // success case
      setCookie({ name: "token", value: data.token, days: 1 });
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
    }
    throw error;
  }
};

export const forgetPassword = async (
  data: forgetPasswordRequestT,
): Promise<forgetPasswordResponseT> => {
  try {
    const validData = forgetPasswordRequestSchema.parse(data);
    const response = await axiosInstance.post(
      "/api/Auth/ForgotPassword",
      validData,
    );
    return forgetPasswordResponseSchema.parse(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return forgetPasswordResponseSchema.parse(error.response.data);
    }
    return forgetPasswordResponseSchema.parse({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const logout = () => {
  deleteCookie({ name: "token" });
};
