import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { IUserLoginRequest, IUserLoginResponse, IAuthorizeResponse } from '@/types/auth/login.types';

export const authApiService = {
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
  },

  signUp: async (body: any): Promise<IServerResponse<void>> => {
    const response = await apiClient.post<IServerResponse<void>>('/secure/signup', body);
    console.log('response', response);
    return response.data;
  },

  signUpCheck: async (body: any): Promise<IServerResponse<void>> => {
    const response = await apiClient.post<IServerResponse<void>>('/secure/signup/check', body);
    return response.data;
  }
};
