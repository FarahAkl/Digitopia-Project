import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "../hooks/useUserData";
import type { UserResponseT } from "../schema/user/profile.schema";
import { profileData } from "../services/User/apiProfile";

export type UserContextT = {
  data: UserResponseT | null;
  loading: boolean;
  error: string | null;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <UserContext.Provider value={{ data, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
