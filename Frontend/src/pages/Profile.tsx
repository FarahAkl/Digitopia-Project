import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { profileData } from "../services/User/apiProfile";
import type { UserResponseT } from "../schema/user/profile.schema";

export default function Profile() {
  const [data, setData] = useState<UserResponseT | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await profileData();
        setData(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Spinner />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!data) return null;

  if ("message" in data) {
    return <p className="text-red-500">{data.message}</p>;
  }

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
          <ul className="list-inside list-disc">
            <li>{data.location}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
