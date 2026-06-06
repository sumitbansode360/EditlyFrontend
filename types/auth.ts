import { SignupSchemaType } from "@/schemas/auth.schema";

export interface SignupType{
    setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
    setRegisteredEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthResponse {
  message: string;
  email: string;
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

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isLoading: boolean;
};

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