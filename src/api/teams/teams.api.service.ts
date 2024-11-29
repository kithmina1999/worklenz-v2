import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { ITeamActivateResponse, ITeamGetResponse } from '@/types/teams/team.type';
import { API_BASE_URL } from '@/shared/constants';

export const teamsApiService = {
  getTeams: async (): Promise<IServerResponse<ITeamGetResponse[]>> => {
    const response = await apiClient.get<IServerResponse<ITeamGetResponse[]>>(
      `${API_BASE_URL}/teams`,
    );
    return response.data;
  },

  setActiveTeam: async (teamId: string): Promise<IServerResponse<ITeamActivateResponse>> => {
    const response = await apiClient.put<IServerResponse<ITeamActivateResponse>>(
      `${API_BASE_URL}/teams/activate`, { id: teamId }
    );
    return response.data;
  },
};
