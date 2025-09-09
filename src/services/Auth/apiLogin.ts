import axiosInstance from "../axiosInstance";
import {
  loginResponseSchema,
  type loginResponseT,
} from "../../schema/auth/login.schema";
import { setCookie } from "../../utils/TS-Cookie";

export const login = async (
  email: string,
  password: string,
): Promise<loginResponseT> => {
  const response = await axiosInstance.post("/api/Auth/Login", {
    email,
    password,
  });
  const data = loginResponseSchema.parse(response.data);
  if ("token" in data) {
    // success case
    setCookie({ name: "token", value: data.token, days: 1 });
  } else {
    // error case
    console.error(data.message);
  }
  return data;
};
