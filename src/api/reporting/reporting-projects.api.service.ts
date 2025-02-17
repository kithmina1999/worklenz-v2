import { IServerResponse } from '@/types/common.types';
import { IGetProjectsRequestBody, IRPTOverviewProjectMember, IRPTProjectsViewModel } from '@/types/reporting/reporting.types';
import apiClient from '../api-client';
import { API_BASE_URL } from '@/shared/constants';
import { toQueryString } from '@/utils/toQueryString';

const rootUrl = `${API_BASE_URL}/reporting/projects`;

export const reportingProjectsApiService = {
  getProjects: async (
    body: IGetProjectsRequestBody
  ): Promise<IServerResponse<IRPTProjectsViewModel>> => {
    const q = toQueryString(body);
    const url = `${rootUrl}${q}`;
    const response = await apiClient.get<IServerResponse<IRPTProjectsViewModel>>(url);
    return response.data;
  },
};
