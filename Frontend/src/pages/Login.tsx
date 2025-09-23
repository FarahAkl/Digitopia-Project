import z from "zod";
import { useState } from "react";
import { Link } from "react-router";
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
        setError(err?.issues[0].message);
      } else if (err instanceof Error) {
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
      <div className="relative">
        <img
          src="/bg-login.png"
          alt="bg-login"
          className="h-full w-full object-cover"
        />
        <h2 className="absolute bottom-20 left-8 text-4xl font-bold text-amber-50 italic lg:bottom-36 lg:left-6 lg:text-6xl">
          Welcome Back!
        </h2>
        <div className="absolute bottom-14 left-8 h-1.5 w-40 rounded-2xl bg-amber-50 lg:bottom-[7.25rem] lg:left-6 lg:w-48"></div>
      </div>
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
          className="text-primary w-full py-2 text-start text-sm"
        >
          Forget Password?
        </button>

        {error && (
          <p className="w-full rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-50 text-sm text-green-500">{success}</p>
        )}

        <Button
          type="submit"
          color="primary"
          className="text-medium w-full border-2 border-lime-700"
        >
          Login
        </Button>

        <div className="text-green-900">
          <span>or</span>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="color-primary">
              Sign Up
            </Link>
            ...
          </p>
        </div>
      </AuthForm>
    </AppLayout>
  );
}
