import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { API_BASE_URL } from '@/shared/constants';

const rootUrl = `${API_BASE_URL}/project-statuses`;

export const teamMembersApiService = {
  getTeamMembers: async (teamId: string): Promise<IServerResponse<any[]>> => {
    const response = await apiClient.get<IServerResponse<any[]>>(
      `${API_BASE_URL}/teams/${teamId}/members`
    );
    return response.data;
  }
};
