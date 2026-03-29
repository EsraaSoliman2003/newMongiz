"use client";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  setToken: () => {},
  setRole: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  initialToken,
  initialRole,
}: {
  children: React.ReactNode;
  initialToken: string | null;
  initialRole: string | null;
}) => {
  const [token, setToken] = useState<string | null>(initialToken);
  const [role, setRole] = useState<string | null>(initialRole);

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
