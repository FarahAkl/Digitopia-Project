// import { AxiosError } from "axios";
// import {
//   resetPasswordResponseSchema,
//   type changePasswordResponseT,
//   type resetPasswordRequestT,
// } from "../../schema/auth/resetPassword.schema";
// import axiosInstance from "../axiosInstance";

// export const resetPassword = async (
//   resetData: resetPasswordRequestT,
// ): Promise<changePasswordResponseT> => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/Auth/ResetPassword",
//       resetData,
//     );
//     const data = resetPasswordResponseSchema.parse(response.data);
//     return data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError && error.response) {
//       return resetPasswordResponseSchema.parse(error.response.data);
//     }
//     return resetPasswordResponseSchema.parse({
//       message: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

import {
  resetPasswordResponseSchema,
  type changePasswordResponseT,
  type resetPasswordRequestT,
} from "../../schema/auth/resetPassword.schema";
import axiosInstance from "../axiosInstance";

export type ResetPasswordResult =
  | { success: true; data: changePasswordResponseT }
  | { success: false; error: changePasswordResponseT };

export const resetPassword = async (
  resetData: resetPasswordRequestT,
): Promise<ResetPasswordResult> => {
  try {
    const response = await axiosInstance.post(
      "/api/Auth/ResetPassword",
      resetData,
      { validateStatus: () => true },
    );

    const parsed = resetPasswordResponseSchema.parse(response.data);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: parsed };
    } else {
      return { success: false, error: parsed };
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: resetPasswordResponseSchema.parse({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
