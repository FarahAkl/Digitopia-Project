import { useState } from "react";
import Card from "../ui/Card";
import Header from "../ui/Header";
import Heading from "../ui/Heading";
import {
  resetPassword,
  type ResetPasswordResult,
} from "../services/Auth/apiResetPass";
import { useSearchParams } from "react-router";
import { Spinner } from "@heroui/react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email || !token) return;

    setLoading(true);
    const result: ResetPasswordResult = await resetPassword({
      email,
      token,
      newPassword,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(result.data.message);
    } else {
      setError(result.error.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <div className="flex h-[90vh] items-center justify-center">
        <Card>
          <Heading>Reset Password</Heading>
          <div className="mb-3 flex flex-col gap-2 [&_input]:w-full [&_input]:rounded-sm [&_input]:bg-blue-50 [&_input]:px-2 [&_input]:py-1">
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
          <button
            type="button"
            className="text-medium mb-4 w-full rounded-sm bg-green-900 py-1 font-semibold text-blue-50"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </Card>
      </div>
    </>
  );
}
