import type { User } from "../types/auth";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any[] | null | string;
}

export type UserAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: any[] }
  | { type: "SIGNUP_REQUEST" }
  | { type: "SIGNUP_SUCCESS"; payload: User }
  | { type: "SIGNUP_FAILURE"; payload: any[] }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "NETWORK_FAILURE" };

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "SIGNUP_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
    case "SIGNUP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "NETWORK_FAILURE":
      return { ...state, loading: false, error: "network down" };
    default:
      return state;
  }
};
