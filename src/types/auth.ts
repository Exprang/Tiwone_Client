export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirm?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Status {
  id: number;
  type_id: number;
  name: string;
  description: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {}
export interface Subscriptions {}

export interface User {
  id: number;
  email: string;
  username: string;
  status_id: number;
  role_id: number;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  profile: Profile | null;
  subscriptions: Subscriptions[];
  role: Role;
  status: Status;
}
