import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { API_BASE_URL } from '@/shared/constants';
import { IProjectsViewModel } from '@/types/project/projectsViewModel.types';
import { toQueryString } from '@/utils/toQueryString';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';

const rootUrl = `${API_BASE_URL}/projects`;

export const projectsApiService = {
  getProjects: async (
    index: number,
    size: number,
    field: string | null,
    order: string | null,
    search: string | null,
    filter: number | null = null,
    statuses: string | null = null,
    categories: string | null = null
  ): Promise<IServerResponse<IProjectsViewModel>> => {
    const s = encodeURIComponent(search || '');
    const url = `${rootUrl}${toQueryString({ index, size, field, order, search: s, filter, statuses, categories })}`;
    const response = await apiClient.get<IServerResponse<IProjectsViewModel>>(`${url}`);
    return response.data;
  },

  getProject: async (id: string): Promise<IServerResponse<IProjectViewModel>> => {
    const url = `${rootUrl}/${id}`;
    const response = await apiClient.get<IServerResponse<IProjectViewModel>>(`${url}`);
    return response.data;
  },

  toggleFavoriteProject: async (id: string): Promise<IServerResponse<IProjectsViewModel>> => {
    const url = `${rootUrl}/favorite/${id}`;
    const response = await apiClient.get<IServerResponse<IProjectsViewModel>>(`${url}`);
    return response.data;
  },
};
