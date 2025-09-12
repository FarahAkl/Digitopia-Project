import { useState, type ReactNode } from "react";
import {
  login as loginService,
  logout as logoutService,
} from "../services/Auth/apiLogin";
import { AuthContext } from "../hooks/useAuth";

export type AuthContextT = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const data = await loginService({ email, password });
    if ("token" in data) {
      setToken(data.token);
    } else {
      throw new Error(data.message)
    }
  };

  const logout = () => {
    logoutService();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

