import { useState } from "react";
import { AxiosError } from "axios";
import { deleteAccount } from "../services/Auth/apiDelete";
import type { UserResponseT } from "../schema/user/profile.schema";
import Card from "./Card";
import Heading from "./Heading";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { MdModeEditOutline } from "react-icons/md";

type ProfileSuccessT = Exclude<UserResponseT, { message: string }>;

export default function ProfileCard({ data }: { data: ProfileSuccessT }) {
  const { logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  if (error) {
    return (
      <p className="mb-1 w-full rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
        ❌ {error}
      </p>
    );
  }
  return (
    <Card>
      <div className="m-10 w-full rounded-xl border-2 border-green-700 bg-white p-4 px-6 text-green-900 shadow-lg [&_p]:my-4">
        <button
          className="rounded-full border-3 p-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("/editProfile");
          }}
        >
          <MdModeEditOutline size={25} />
        </button>
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
          <p>
            <strong>Location:</strong> {data.location}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-1 lg:flex-row">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="border-1.5 w-full rounded-sm bg-red-50 p-2 text-red-500"
          >
            Delete Account
          </button>
          <Link
            to={"/changePassword"}
            className="border-1.5 w-full rounded-sm bg-blue-50 p-2 text-center text-green-900"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Card>
  );
}
