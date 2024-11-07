import { IServerResponse } from '@/types/common.types';
import apiClient from '../apiClient';
import { API_BASE_URL } from '@/shared/constants';
import { IProjectsViewModel } from '@/types/project/projectsViewModel.types';
import { toQueryString } from '@/utils/toQueryString';

const rootUrl = `${API_BASE_URL}/projects`;

export const projectsApiService = {
  getProjects: async (
    index: number,
    size: number,
    field: string | null,
    order: string | null,
    search: string | null,
    filter: number | null = null
  ): Promise<IServerResponse<IProjectsViewModel>> => {
    const s = encodeURIComponent(search || '');
    const url = `${rootUrl}${toQueryString({ index, size, field, order, search: s, filter })}`;
    const response = await apiClient.get<IServerResponse<IProjectsViewModel>>(`${url}`);
    return response.data;
  },
};
