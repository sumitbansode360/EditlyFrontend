import { SignupSchemaType } from "@/schemas/auth.schema";

export interface PendingUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type SignupStep = "signup" | "edit" | "verify";

export interface SignupType {
  mode: SignupStep;
  pendingUser?: PendingUser | null;
  setPendingUser: React.Dispatch<React.SetStateAction<PendingUser | null>>;
  setCurrentStep?: React.Dispatch<React.SetStateAction<SignupStep>>;
}

export interface AuthResponse {
  message: string;
  user: PendingUser;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginPayload {
  username: string; // Maps from UI email
  password: string;
}

export interface SignupPayload {
  username: string; // Maps from UI email
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export type LoginSchemaType = Pick<SignupSchemaType, "email" | "password">;
