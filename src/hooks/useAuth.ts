import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { LoginRequest, SignupRequest, User } from "../types/auth";
import { signin, signup as signupUser } from "../api/authAPI";

export const useUser = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (credentials: LoginRequest) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await signin(credentials);
      if (response.status === 200) {
        const { success, token, user } = response.data;
        if (!success) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: response.data.errors,
          });
        }
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: response.data.errors });
      }
    } catch {
      dispatch({ type: "NETWORK_FAILURE" });
    }
  };

  const signup = async (credentials: SignupRequest) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
      const response = await signupUser(credentials);

      if (response.status === 200) {
        const { success, token, user } = response.data;
        if (!success) {
          dispatch({
            type: "SIGNUP_FAILURE",
            payload: response.data.errors,
          });
        }
        localStorage.setItem("token", token);
        dispatch({ type: "SIGNUP_SUCCESS", payload: user });
      } else {
        dispatch({ type: "SIGNUP_FAILURE", payload: response.data.errors });
      }
    } catch {
      dispatch({ type: "NETWORK_FAILURE" });
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (data: User) =>
    dispatch({ type: "UPDATE_USER", payload: data });

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    signup,
    logout,
    updateUser,
  };
};
