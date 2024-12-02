import { API_BASE_URL } from '@/shared/constants';
import { IServerResponse } from '@/types/common.types';
import { IProjectTemplate, IWorklenzTemplate } from '@/types/project-templates/project-templates.types';
import { toQueryString } from '@/utils/toQueryString';
import apiClient from '../api-client';

const rootUrl = `${API_BASE_URL}/project-templates`;

export const projectTemplatesApiService = {
  getWorklenzTemplates: async (): Promise<IServerResponse<IWorklenzTemplate[]>> => {
    const response = await apiClient.get(`${rootUrl}/worklenz-templates`);
    return response.data;
  },

  getByTemplateId: async (templateId: string): Promise<IServerResponse<IProjectTemplate>> => {
    const response = await apiClient.get(`${rootUrl}/worklenz-templates/${templateId}`);
    return response.data;
  },

  getCustomTemplates: async (): Promise<IServerResponse<IProjectTemplate[]>> => {
    const response = await apiClient.get(`${rootUrl}/custom-templates`);
    return response.data;
  },
};

