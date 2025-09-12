import { useState } from "react";
import { useNavigate } from "react-router";
import { loginRequestSchema } from "../schema/auth/login.schema";
import { Link } from "react-router";
import { AxiosError } from "axios";
import { forgetPasswordRequestSchema } from "../schema/auth/forgetPassword.schema";
import { forgetPassword } from "../services/Auth/apiLogin";
import { useAuth } from "../hooks/useAuth";
import {FadeLoader} from "react-spinners"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgetLoading, setForgetLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validate inputs with zod
    const parsed = loginRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      const firstError = parsed.error.issues?.at(0)?.message || "Invalid input";
      setError(firstError);
      return;
    }

    try {
      setLoginLoading(true);
      await auth?.login(email, password);
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err?.status === 401
            ? "Invalid Email or Password"
            : "Login failed. Please try again.",
        );
        console.log(err);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForget = async () => {
    setError(null);
    const parsed = forgetPasswordRequestSchema.safeParse({ email });

    if (!parsed.success) {
      const firstError = parsed.error.issues?.at(0)?.message || "Invalid input";
      setError(firstError);
      return;
    }

    try {
      setForgetLoading(true);
      const res = await forgetPassword(parsed.data);
      setEmail("");
      setError(res.message);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err?.status === 401 ? "Invalid Email" : "Failed. Please try again.",
        );
        console.log(err);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setForgetLoading(false);
    }
  };

  if (loginLoading || forgetLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <FadeLoader
          color={'green'}
          loading={loginLoading || forgetLoading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="rounded border p-2"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loginLoading}
        className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loginLoading ? "Logging in..." : "Login"}
      </button>
      <Link to="/register">Register</Link>
      <Link to="/changePassword">Change Password</Link>
      <button type="button" onClick={handleForget} disabled={forgetLoading}>
        {forgetLoading ? "Sending..." : "Forget Password"}
      </button>
    </form>
  );
}
