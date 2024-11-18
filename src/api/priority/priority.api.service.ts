import { IServerResponse } from '@/types/common.types';
import apiClient from '../apiClient';
import { API_BASE_URL } from '@/shared/constants';

const rootUrl = `${API_BASE_URL}/task-priorities`;

export const priorityApiService = {
  getPriorities: async (): Promise<IServerResponse<any[]>> => {
    const response = await apiClient.get<IServerResponse<any[]>>(
      `${rootUrl}`
    );
    return response.data;
  }
};
