// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// // import { useNavigate } from "react-router";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = useContext(AuthContext);
// //   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//         await auth?.login(email, password);
//         setEmail('')
//         setPassword('')
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </>
//   );
// }

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router";
import { loginRequestSchema } from "../schema/auth/login.schema";
import { setErrorMap } from "zod/v3";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validate inputs with zod
    const parsed = loginRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      const firstError =
        parsed.error.issues?.at(0)?.message || "Invalid input"; // Zod v3 fallback
      setError(firstError);
      return;
    }

    try {
      setLoading(true);
      await auth?.login(email, password);
      setEmail("");
      setPassword("");

      // navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.status === 401
          ? "Invalid Email or Password"
          : "Login failed. Please try again.",
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
        disabled={loading}
        className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
