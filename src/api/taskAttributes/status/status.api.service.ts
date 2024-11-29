import { IServerResponse } from '@/types/common.types';
import apiClient from '@api/api-client';
import { API_BASE_URL } from '@/shared/constants';
import { ITaskStatus, ITaskStatusCategory } from '@/types/status.types';

const rootUrl = `${API_BASE_URL}/statuses`;

export const statusApiService = {
  getStatuses: async (): Promise<IServerResponse<ITaskStatus[]>> => {
    const response = await apiClient.get<IServerResponse<ITaskStatus[]>>(
      `${rootUrl}`
    );
    return response.data;
  },

  getStatusCategories: async (): Promise<IServerResponse<ITaskStatusCategory[]>> => {
    const response = await apiClient.get<IServerResponse<ITaskStatusCategory[]>>(
      `${rootUrl}/categories`
    );
    return response.data;
  }
};
