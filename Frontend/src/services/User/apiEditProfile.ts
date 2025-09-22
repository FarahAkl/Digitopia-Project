import axiosInstance from "../axiosInstance";
import {
  editProfileRequestSchema,
  editProfileResponseSchema,
  type editProfileRequestT,
  type editProfileResponseT,
} from "../../schema/user/editProfile.schema";

export const editProfile = async (
  body: editProfileRequestT,
): Promise<editProfileResponseT> => {
  const parsedBody = editProfileRequestSchema.parse(body);

  const response = await axiosInstance.put("/api/User/Profile", parsedBody);

  return editProfileResponseSchema.parse(response.data);
};
