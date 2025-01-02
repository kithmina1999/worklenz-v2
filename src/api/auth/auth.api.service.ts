import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { IUserLoginRequest, IUserLoginResponse, IAuthorizeResponse } from '@/types/auth/login.types';

export const authApiService = {
  async login(credentials: IUserLoginRequest): Promise<IAuthorizeResponse> {
    const response = await apiClient.post<IAuthorizeResponse>('/secure/login', credentials);
    return response.data;
  },

  async logout(): Promise<IServerResponse<void>> {
    const response = await apiClient.get<IServerResponse<void>>('/secure/logout');
    return response.data;
  },

  async verify(): Promise<IAuthorizeResponse> {
    const response = await apiClient.get<IAuthorizeResponse>('/secure/verify');
    return response.data;
  },

  async signUp(body: any): Promise<IServerResponse<void>> {
    const response = await apiClient.post<IServerResponse<void>>('/secure/signup', body);
    return response.data;
  },

  async signUpCheck(body: any): Promise<IServerResponse<void>> {
    const response = await apiClient.post<IServerResponse<void>>('/secure/signup/check', body);
    return response.data;
  },

  async resetPassword(email: string): Promise<IServerResponse<string>> {
    const response = await apiClient.post<IServerResponse<string>>('/secure/reset-password', { email });
    return response.data;
  }
};
