import { useEffect, useState } from "react";
import { editProfile } from "../services/User/apiEditProfile";
import Card from "../ui/Card";
import Header from "../ui/Header";
import Heading from "../ui/Heading";
import type { editProfileRequestT } from "../schema/user/editProfile.schema";
import { profileData } from "../services/User/apiProfile";
import { Spinner } from "@heroui/react";

export default function EditProfile() {
  const [form, setForm] = useState<editProfileRequestT>({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    profileImageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileData();
        if ("name" in res) {
          setForm({
            name: res.name || "",
            email: res.email || "",
            phoneNumber: res.phoneNumber || "",
            location: res.location || "",
            profileImageUrl: res.profileImageUrl || "",
          });
        } else {
          setError(res.message || "Failed to load profile");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await editProfile(form);
      if ("message" in res) {
        setSuccess(res.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Update failed");
      }
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
    <>
      <Header />
      <div className="flex min-h-[90vh] w-full items-center justify-center bg-blue-50 p-5">
        <Card>
          <Heading>Edit Profile</Heading>
          <div className="mb-3 flex w-full flex-col gap-2 [&_input]:w-full [&_input]:rounded-sm [&_input]:bg-blue-50 [&_input]:px-2 [&_input]:py-1">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <input
              type="text"
              name="location"
              value={form.location??''}
              onChange={handleChange}
              placeholder="Location"
            />

            <input
              type="text"
              name="profileImageUrl"
              value={form.profileImageUrl ?? ""}
              onChange={handleChange}
              placeholder="Profile Image URL"
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="text-medium mb-4 w-full rounded-sm bg-green-900 py-1 font-semibold text-blue-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {success && (
              <p className="mb-1 w-full rounded-md bg-green-50 px-2 py-1 text-sm text-green-500">
                ✅ {success}
              </p>
            )}
            {error && (
              <p className="mb-1 w-full rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
                ❌ {error}
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
