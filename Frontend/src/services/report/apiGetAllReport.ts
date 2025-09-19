import axios from "axios";
import axiosInstance from "../axiosInstance";
import {
  reportsResponseSchema,
  type reportsResponseT,
} from "../../schema/report/createReport.schema";

const getAllReports = async (): Promise<reportsResponseT> => {
  try {
    const response = await axiosInstance.get("/api/Report/All");
    const validateResponse = reportsResponseSchema.parse(response.data);

    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.log(error.response?.data);
      return [];
    } else {
      console.log(error);
      return [];
    }
  }
};

export { getAllReports };
