import { useState } from "react";
import { AxiosError } from "axios";
import { deleteAccount } from "../services/Auth/apiDelete";
import type { UserResponseT } from "../schema/user/profile.schema";
import Card from "./Card";
import Heading from "./Heading";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

type ProfileSuccessT = Exclude<UserResponseT, { message: string }>;

export default function ProfileCard({ data }: { data: ProfileSuccessT }) {
  const { logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setError(null);
    try {
      setLoading(true);
      const res = await deleteAccount();
      alert(res.message || "Account deleted successfully");
      logout();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Delete failed");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <div className="m-10 w-full rounded-xl border-2 border-green-700 bg-white p-4 px-6 text-green-900 shadow-lg [&_p]:my-4">
        <Heading>Profile</Heading>
        {data.profileImageUrl && (
          <img
            src={
              "/default-user.jpg"
              // data.profileImageUrl === null
              //   ? "/default-user.jpg"
              //   : data.profileImageUrl
            }
            alt={`${data.name}'s profile`}
            className="mx-auto my-6 h-24 w-24 rounded-full object-cover"
          />
        )}
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {data.role}
        </p>
        {data.location && (
          <div className="mt-2">
            <strong>Location:</strong>
            <p>{data.location}</p>
          </div>
        )}
        {error ? <p>{error}</p> : ""}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="border-1.5 rounded-sm bg-red-50 p-2 text-red-500"
          >
            Delete Account
          </button>
          <Link
            to={"/changePassword"}
            className="border-1.5 rounded-sm bg-blue-50 p-2 text-green-900"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Card>
  );
}
