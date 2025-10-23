import type { LoginRequest, SignupRequest } from "../types/auth";
import api from "./index";

// Signin
export const signin = async (data: LoginRequest) => {
  try {
    const response = await api.post("/api/auth/signin", data);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

// Signup
export const signup = async (data: SignupRequest) => {
  try {
    const response = await api.post("/api/auth/signup", data);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

// Logout
export const logout = async (): Promise<void> => {
  await api.post("/api/auth/signout");
  localStorage.removeItem("token");
};

// Get current signed-in user
export const getCurrentUser = async (token: string) => {
  try {
    const response = await api.get("/api/auth/signed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};
