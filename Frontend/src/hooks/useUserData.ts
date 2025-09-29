import { createContext, useContext } from "react";
import type { UserContextT } from "../context/UserContext";

export const UserContext = createContext<UserContextT | null>(null);

export function useUserData() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserData must be used inside AuthProvider");
  return context;
}
