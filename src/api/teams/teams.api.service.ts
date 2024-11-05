import { IServerResponse } from '@/types/common.types';
import apiClient from '../apiClient';
import { ITeamGetResponse } from '@/types/teams/team.type';
import { API_BASE_URL } from '@/shared/constants';

export const teamsApiService = {
  getTeams: async (): Promise<IServerResponse<ITeamGetResponse[]>> => {
    const response = await apiClient.get<IServerResponse<ITeamGetResponse[]>>(
      `${API_BASE_URL}/teams`,
    );
    return response.data;
  },
};