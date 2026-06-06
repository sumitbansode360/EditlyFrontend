"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginResponse, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = document.cookie.includes("access_token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (data: LoginResponse) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    // Store tokens in cookies for Middleware/SSR access
    document.cookie = `access_token=${data.access}; path=/; SameSite=Lax; Secure`;
    document.cookie = `refresh_token=${data.refresh}; path=/; SameSite=Lax; Secure`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};