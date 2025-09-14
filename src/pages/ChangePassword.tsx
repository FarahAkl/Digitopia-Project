import { useState } from "react";
import { changePassword } from "../services/Auth/apiChangePassword";
import { changePasswordRequestSchema } from "../schema/auth/changePassword.schema";
import { AxiosError } from "axios";
import { Link } from "react-router";
import { Spinner } from "@heroui/react";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-80 flex-col gap-3"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="rounded border p-2"
      />
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Enter your old password"
        className="rounded border p-2"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password"
        className="rounded border p-2"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>

      <Link to="/login">Back to Login</Link>
    </form>
  );
}
