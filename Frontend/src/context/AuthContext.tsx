import { useState, type ReactNode } from "react";
import {
  login as loginService,
  logout as logoutService,
} from "../services/Auth/apiLogin";
import { AuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export type AuthContextT = {
  token: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ message: string } | undefined>;
  logout: () => void;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const data = await loginService({ email, password });
    if ("token" in data) {
      setToken(data.token);
      if (data.role === "User") {
        navigate("/map");
      } else if (data.role === "Admin") {
        navigate("/dashboard");
      }
    } else {
      return data
    }
  };

  const logout = () => {
    logoutService();
    setToken(null);
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
