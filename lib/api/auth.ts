import axios from "axios";
import { AuthResponse, LoginPayload, SignupPayload, LoginResponse, ForgotPasswordResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const signupUser = async (data: SignupPayload): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register/`, data);
    // Store email in temporary cookie for activation resend (expires in 1 hour)
    document.cookie = `temp_reg_email=${response.data.email}; path=/; max-age=3600; SameSite=Lax`;
    return response.data;
  } catch (error: any) {
    const data = error.response?.data;
    const message = data?.message || data?.detail || "An error occurred during signup";
    
    const err = new Error(message) as any;
    
    // Map Django/DRF field errors to the error object for component-level handling
    if (data && typeof data === "object") {
      if (data.email) err.email = Array.isArray(data.email) ? data.email[0] : data.email;
      if (data.username) err.username = Array.isArray(data.username) ? data.username[0] : data.username;
    }
    
    throw err;
  }
};

export const resendActivation = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/resend-activation-email/`, { email });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.detail || "Failed to resend activation email";
    const err = new Error(message) as any;
    err.status = error.response?.status;
    throw err;
  }
};

export const activateUser = async (uid: string, token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/activate/${uid}/${token}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.response?.data?.detail || "Failed to activate account"
    );
  }
};


export async function updatePendingUser(
  id: string,
  payload: SignupPayload
) {
  const response = await axios.patch(
    `${API_URL}/api/auth/update-pending-user/${id}/`,
    payload
  );

  return response.data;
}

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/forgot-password/`,
      {
        email,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.detail ||
        "Failed to send password reset email"
    );
  }
};