import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getCookie } from "../utils/TS-Cookie";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();

  if (!auth?.token || !getCookie({ name: "token" })) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
