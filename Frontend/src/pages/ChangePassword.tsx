import { useState } from "react";
import { changePassword } from "../services/Auth/apiChangePassword";
import { changePasswordRequestSchema } from "../schema/auth/changePassword.schema";
import { AxiosError } from "axios";
import { Link } from "react-router";
import { Spinner } from "@heroui/react";
import Card from "../ui/Card";
import Heading from "../ui/Heading";
import Header from "../ui/Header";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setError("New password must be the same as the confirm new password");
    }

    if (!email || !oldPassword || !newPassword || !confirmNewPassword) return;

    // validate inputs with zod
    const parsed = changePasswordRequestSchema.safeParse({
      email,
      oldPassword,
      newPassword,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues?.at(0)?.message || "Invalid input";
      setError(firstError);
      return;
    }

    if (parsed.data.oldPassword === parsed.data.newPassword) {
      setError("New password cannot be the same as the old password");
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword(parsed.data);

      if (res.ok) {
        setSuccess(res.message);
        setEmail("");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(res.message);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("Change password failed. Please try again.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );

  return (
    <>
      <Header />
      <div className="flex h-[90vh] w-full items-center justify-center bg-blue-50 p-5">
        <Card>
          <Heading>ChangePassword</Heading>
          <div className="mb-3 flex w-full flex-col gap-2 [&_input]:w-full [&_input]:rounded-sm [&_input]:bg-blue-50 [&_input]:px-2 [&_input]:py-1">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={oldPassword}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              value={confirmNewPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {error && (
              <p className="mb-1 w-full rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
                ❌ {error}
              </p>
            )}
            {success && (
              <p className="mb-1 w-full rounded-md bg-green-50 px-2 py-1 text-sm text-green-500">
                ✅ {success}
              </p>
            )}
            <div className="my-4 flex gap-4">
              <button
                type="button"
                className="text-medium w-1/2 rounded-sm bg-green-900 py-1 font-semibold text-blue-50"
                onClick={handleSubmit}
              >
                Change Password
              </button>
              <Link
                to={"/login"}
                className="border-1.5 w-1/2 rounded-sm bg-blue-50 py-1 text-center text-green-900"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
