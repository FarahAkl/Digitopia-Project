import axios from "axios";
import {
  forgetPasswordRequestSchema,
  forgetPasswordResponseSchema,
  type forgetPasswordRequestT,
  type forgetPasswordResponseT,
} from "../../schema/auth/forgetPassword.schema";

export async function forgetPassword(
  body: forgetPasswordRequestT,
): Promise<forgetPasswordResponseT> {
  // ✅ Validate request before sending
  const parsed = forgetPasswordRequestSchema.parse(body);

  const { data } = await axios.post("/api/Auth/ForgotPassword", parsed);

  // ✅ Validate response (success or error)
  return forgetPasswordResponseSchema.parse(data);
}
