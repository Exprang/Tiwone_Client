import { useReducer, type ReactNode, useEffect } from "react";
import { userReducer } from "../reducers/useReducer";
import { getCurrentUser } from "../api/authAPI";
import { AuthContext, initialState } from "../hooks/useAuth";

interface UserProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Check localStorage for token/user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await getCurrentUser(token);

        if (response.status === 200) {
          const { success, user } = response.data;
          if (!success) {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: response.data.errors,
            });
          }
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: response.data.errors });
        }
      } catch {
        dispatch({ type: "NETWORK_FAILURE" });
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
