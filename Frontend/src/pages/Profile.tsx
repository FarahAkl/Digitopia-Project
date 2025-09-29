import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { profileData } from "../services/User/apiProfile";
import type { UserResponseT } from "../schema/user/profile.schema";
import Header from "../ui/Header";
import ProfileCard from "../ui/ProfileCard";

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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  if (!data) return null;

  if ("message" in data) {
    return <p className="text-red-500">{data.message}</p>;
  }

  return (
    <>
      <Header />
      <div className="flex min-h-[90vh] items-center justify-center bg-blue-50 p-5">
        <ProfileCard data={data} />
      </div>
    </>
  );
}
