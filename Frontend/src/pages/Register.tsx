import { useState } from "react";
import { register } from "../services/Auth/apiRegister";
import {
  registerRequestSchema,
  type registerRequestT,
} from "../schema/auth/register.schema";
import { Spinner, Button } from "@heroui/react";
import AppLayout from "../ui/AppLayout";
import { AuthForm } from "../ui/AuthForm";
import { AuthInput } from "../ui/AuthInput";
import Heading from "../ui/Heading";

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

  const handleChange = (key: keyof registerRequestT, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <AppLayout>
      {serverMessage && (
        <div className="mb-3 text-center text-sm text-red-500">
          {serverMessage}
        </div>
      )}

      <AuthForm onSubmit={handleSubmit}>
        <Heading>SignUp Form</Heading>
        <div
          onClick={() => document.getElementById("uploadImageInput")?.click()}
          className="absolute top-14 right-3 z-40 flex h-30 w-30 items-center justify-center rounded-full border-4 border-green-600 bg-green-900 text-center lg:top-8"
        >
          <p className="text-xl font-semibold text-amber-50">
            {!formData.profileImageUrl
              ? "+ Upload Image"
              : "+ Upload New Image"}
          </p>
          <input
            hidden
            id="uploadImageInput"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                handleChange("profileImageUrl", url); // string
              }
            }}
          />
        </div>
        <AuthInput
          value={formData.name}
          placeholder="Name"
          onChange={(val) => handleChange("name", val)}
        />
        {errors.name && (
          <p className="w-full rounded-md bg-red-100 px-3 py-2 text-xs text-red-500">
            {errors.name}
          </p>
        )}

        <AuthInput
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={(val) => handleChange("email", val)}
        />
        {errors.email && (
          <p className="w-full rounded-md bg-red-100 px-3 py-2 text-xs text-red-500">
            {errors.email}
          </p>
        )}

        <AuthInput
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={(val) => handleChange("password", val)}
        />
        {errors.password && (
          <p className="w-full rounded-md bg-red-100 px-3 py-2 text-xs text-red-500">
            {errors.password}
          </p>
        )}

        <AuthInput
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={(val) => handleChange("phoneNumber", val)}
        />
        {errors.phoneNumber && (
          <p className="w-full rounded-md bg-red-100 px-3 py-2 text-xs text-red-500">
            {errors.phoneNumber}
          </p>
        )}

        <AuthInput
          value={formData.location}
          placeholder="Location (Optional)"
          onChange={(val) => handleChange("location", val)}
        />
        {errors.location && (
          <p className="w-full rounded-md bg-red-100 px-3 py-2 text-xs text-red-500">
            {errors.location}
          </p>
        )}

        <Button
          type="submit"
          color="primary"
          className="text-medium w-full border-2 border-lime-700"
        >
          Sign Up
        </Button>
      </AuthForm>
      <div className="hidden md:block">
        <img
          src="/bg-signup.png"
          alt="bg-signup"
          className="h-full w-full object-cover"
        />
      </div>
    </AppLayout>
  );
}
