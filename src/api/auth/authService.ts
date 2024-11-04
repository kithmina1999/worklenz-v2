import { IServerResponse } from '@/types/common.types';
import apiClient from '../apiClient';
import { IUserLoginRequest, IUserLoginResponse, IAuthorizeResponse } from '@/types/auth/login.types';

export const authService = {
  login: async (credentials: IUserLoginRequest): Promise<IAuthorizeResponse> => {
    const response = await apiClient.post<IAuthorizeResponse>(
      '/secure/login',
      credentials
    );
    return response.data;
  },

  logout: async (): Promise<IServerResponse<void>> => {
    const response = await apiClient.get<IServerResponse<void>>('/secure/logout');
    return response.data;
  },

  verify: async (): Promise<IAuthorizeResponse> => {
    const response = await apiClient.get<IAuthorizeResponse>('/secure/verify');
    return response.data;
  }
};