export interface User {
  id: string;
  email: string;
  name: string;
}

export interface IUser {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
  team_id?: string;
  project_id?: string;
}

export interface IUserLoginResponse extends IUser {}

export interface IAuthorizeResponse {
  authenticated: boolean;
  user: IUser;
  auth_error: string;
  message: string;
}

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  teamId?: string;
  projectId?: string;
}
