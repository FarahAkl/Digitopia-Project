// import { AxiosError } from "axios";
// import {
//   userResponseSchema,
//   type UserResponseT,
// } from "../../schema/user/profile.schema";
// import axiosInstance from "../axiosInstance";

// export const profileData = async (): Promise<UserResponseT> => {
//   try {
//     const response = await axiosInstance.get("/api/User/Profile");
//     const data = userResponseSchema.parse(response.data);
//     return data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError && error.response) {
//       return userResponseSchema.parse(error.response.data);
//     }
//     return userResponseSchema.parse({
//       message: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

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
      // لو السيرفر رجع JSON { message: "..."}
      return userResponseSchema.parse(error.response.data);
    }
    throw error; // 🟢 سيبيه يرمي خطأ عشان نتحكم فيه في الصفحة
  }
};
