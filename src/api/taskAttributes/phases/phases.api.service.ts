import apiClient from '@/api/api-client';
import { API_BASE_URL } from '@/shared/constants';
import { IServerResponse } from '@/types/common.types';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { toQueryString } from '@/utils/toQueryString';

const rootUrl = `${API_BASE_URL}/task-phases`;

export const phasesApiService = {
  addPhaseOption: async (projectId: string) => {
    const q = toQueryString({ id: projectId, current_project_id: projectId });
    const response = await apiClient.post<IServerResponse<ITaskPhase>>(`${rootUrl}${q}`);
    return response.data;
  },

  getPhasesByProjectId: async (projectId: string) => {
    const q = toQueryString({ id: projectId });
    const response = await apiClient.get<IServerResponse<ITaskPhase[]>>(`${rootUrl}${q}`);
    return response.data;
  },

  deletePhaseOption: async (phaseOptionId: string, projectId: string) => {
    const q = toQueryString({ id: projectId, current_project_id: projectId });
    const response = await apiClient.delete<IServerResponse<ITaskPhase>>(
      `${rootUrl}/${phaseOptionId}${q}`
    );
    return response.data;
  },

  updatePhaseColor: async (projectId: string, body: ITaskPhase) => {
    const q = toQueryString({id: projectId, current_project_id: projectId})
    const response = await apiClient.put<IServerResponse<ITaskPhase>>(
      `${rootUrl}/change-color/${body.id}${q}`,
      body
    );
    return response.data;
  },

  updatePhaseName: async (projectId: string, name: string,) => {
    const q = toQueryString({current_project_id: projectId})
    const response = await apiClient.put<IServerResponse<ITaskPhase>>(
      `${rootUrl}/label/${projectId}${q}`, {name});
    return response.data;
  },

  updatePhaseOrder: async (projectId: string, body: ITaskPhase) => {
    const q = toQueryString({id: projectId, current_project_id: projectId})
    const response = await apiClient.put<IServerResponse<ITaskPhase>>(
      `${rootUrl}/order/${body.id}${q}`,
      body
    );
  },
};
