import { createContext, useContext } from "react";
import type { AuthContextT } from "../context/AuthContext";

export const AuthContext = createContext<AuthContextT | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
