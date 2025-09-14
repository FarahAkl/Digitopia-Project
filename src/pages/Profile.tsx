import { useEffect, useState } from "react";
import { profileData } from "../services/User/apiProfile";
import type { UserResponseT } from "../schema/user/profile.schema";
import { Spinner } from "@heroui/react";

export default function Profile() {
  const [data, setData] = useState<UserResponseT | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await profileData();
      setData(res);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <Spinner />;

  if (!data) return null;

  // ✅ check if it's an error
  if ("message" in data) {
    return <p className="text-red-500">{data.message}</p>;
  }

  // ✅ here TypeScript knows it's success response
  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Profile</h2>
      {data.profileImageUrl && (
        <img
          src={data.profileImageUrl}
          alt={`${data.name}'s profile`}
          className="mb-4 h-24 w-24 rounded-full object-cover"
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
          <strong>Locations:</strong>
          <p>{data.location}</p>
        </div>
      )}
    </div>
  );
}
