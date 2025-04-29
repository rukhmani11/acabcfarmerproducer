import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const user = JSON.parse(stored);
      const roles = user.role?.split(",") || [];
      setAuth({
        Roles: roles,
        Token: user.token,
        UserId: user.userId,
        UserName: user.username,
      });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
