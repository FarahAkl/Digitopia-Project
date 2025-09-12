import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
