import z from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Spinner } from "@heroui/react";
import { loginRequestSchema } from "../schema/auth/login.schema";
import { useAuth } from "../hooks/useAuth";
import { AuthForm } from "../ui/AuthForm";
import { AuthInput } from "../ui/AuthInput";
import AppLayout from "../ui/AppLayout";
import Heading from "../ui/Heading";
import { forgetPassword } from "../services/Auth/apiLogin";
import { forgetPasswordRequestSchema } from "../schema/auth/forgetPassword.schema";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const parsed = loginRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid input");
      return;
    }

    try {
      setLoading(true);
      await auth?.login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  const handleForgetPassword = async (): Promise<void> => {
    setError(null);
    setSuccess(null);
    try {
      const parsed = forgetPasswordRequestSchema.parse({ email });
      const res = await forgetPassword(parsed);
      setSuccess(res.message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // ❌ Validation error
        setError(err?.issues[0].message);
      } else if (err instanceof Error) {
        // ❌ API/network error
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <AppLayout>
      <AuthForm onSubmit={handleSubmit}>
        <Heading>Login Form</Heading>
        <AuthInput
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={setEmail}
        />
        <AuthInput
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={setPassword}
        />
        <button
          type="button"
          onClick={handleForgetPassword}
          className="text-primary text-sm"
        >
          Forget Password?
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <Button type="submit" color="primary" className="w-full">
          Login
        </Button>

        <div className="flex justify-between text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
          <Link to="/changePassword" className="text-blue-600 hover:underline">
            Change Password
          </Link>
        </div>
      </AuthForm>
    </AppLayout>
  );
}
