import { AxiosError } from "axios";
import { deleteAccount } from "../services/Auth/apiDelete";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

export default function Dashboard() {
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
    <>
      <button type="button" onClick={handleDelete} disabled={loading}>
        {loading ? "loading..." : "Delete Account"}
      </button>
      {error ? error : ""}
      <Link to='/profile'>Profile</Link>
    </>
  );
}
