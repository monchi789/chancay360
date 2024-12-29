// types/auth.ts
export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface GoogleRedirectParams {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  id: string | null;
}

export interface GoogleRedirectResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
