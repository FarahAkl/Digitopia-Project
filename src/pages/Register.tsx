import { useState } from "react";
import { register } from "../services/Auth/apiRegister";
import { registerRequestSchema, type registerRequestT } from "../schema/auth/register.schema";

export default function RegisterPage() {
  const [formData, setFormData] = useState<registerRequestT>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profileImageUrl: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const cleanedData = {
        ...formData,
        profileImageUrl: formData.profileImageUrl || undefined,
        location: formData.location || undefined,
      };

    const parsed = registerRequestSchema.safeParse(cleanedData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setServerMessage(null);

    try {
      const res = await register(parsed.data);
      setServerMessage(res.message);
    } catch {
      setServerMessage("Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-center text-xl font-bold">Register</h2>

        {serverMessage && (
          <div className="mb-3 text-center text-sm text-red-500">
            {serverMessage}
          </div>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="mb-2 text-xs text-red-500">{errors.name}</p>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mb-2 text-xs text-red-500">{errors.email}</p>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mb-2 text-xs text-red-500">{errors.password}</p>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number (Optional)"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className="mb-2 text-xs text-red-500">{errors.phoneNumber}</p>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="url"
          name="profileImageUrl"
          placeholder="Profile Image URL (Optional)"
          value={formData.profileImageUrl}
          onChange={handleChange}
        />
        {errors.profileImageUrl && (
          <p className="mb-2 text-xs text-red-500">{errors.profileImageUrl}</p>
        )}

        <input
          className="mb-1 w-full rounded border p-2"
          type="text"
          name="location"
          placeholder="Location (Optional)"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && (
          <p className="mb-2 text-xs text-red-500">{errors.location}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "..." : "Register"}
        </button>
      </form>
    </div>
  );
}
