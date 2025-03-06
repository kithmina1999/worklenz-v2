import {
  ITaskListColumn,
  ITaskListGroup,
  ITaskListMemberFilter,
} from '@/types/tasks/taskList.types';
import apiClient from '@api/api-client';
import { API_BASE_URL } from '@/shared/constants';
import { IServerResponse } from '@/types/common.types';
import { toQueryString } from '@/utils/toQueryString';
import { ITeamMemberViewModel } from '@/types/teamMembers/teamMembersGetResponse.types';
import { ITaskFormViewModel } from '@/types/tasks/task.types';
import { InlineMember } from '@/types/teamMembers/inlineMember.types';

const rootUrl = `${API_BASE_URL}/tasks`;

export interface ITaskListConfigV2 {
  id: string;
  field: string | null;
  order: string | null;
  search: string | null;
  statuses: string | null;
  members: string | null;
  projects: string | null;
  labels?: string | null;
  priorities?: string | null;
  archived?: boolean;
  count?: boolean;
  parent_task?: string;
  group?: string;
  isSubtasksInclude: boolean;
}

export const tasksApiService = {
  getTaskList: async (config: ITaskListConfigV2): Promise<IServerResponse<ITaskListGroup[]>> => {
    const q = toQueryString(config);
    const response = await apiClient.get(`${rootUrl}/list/v2/${config.id}${q}`);
    return response.data;
  },

  fetchTaskAssignees: async (
    projectId: string
  ): Promise<IServerResponse<ITeamMemberViewModel[]>> => {
    const response = await apiClient.get(`${rootUrl}/assignees/${projectId}`);
    return response.data;
  },

  fetchTaskListColumns: async (projectId: string): Promise<IServerResponse<ITaskListColumn[]>> => {
    const response = await apiClient.get(`${rootUrl}/list/columns/${projectId}`);
    return response.data;
  },

  getFormViewModel: async (
    taskId: string | null,
    projectId: string | null
  ): Promise<IServerResponse<ITaskFormViewModel>> => {
    const params = [];
    if (taskId) params.push(`task_id=${taskId}`);
    if (projectId) params.push(`project_id=${projectId}`);
    const q = params.length ? `?${params.join('&')}` : '';
    const response = await apiClient.get(`${rootUrl}/info${q}`);
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<IServerResponse<void>> => {
    const response = await apiClient.delete(`${rootUrl}/${taskId}`);
    return response.data;
  },

  toggleColumnVisibility: async (projectId: string, item: ITaskListColumn): Promise<IServerResponse<ITaskListColumn>> => {
    const response = await apiClient.put(`${rootUrl}/list/columns/${projectId}`, item);
    return response.data;
  },

  getSubscribers: async (taskId: string): Promise<IServerResponse<InlineMember[]>> => {
    const response = await apiClient.get(`${rootUrl}/subscribers/${taskId}`);
    return response.data;
  },

  convertToSubtask: async (taskId: string, projectId: string, parentTaskId: string, groupBy: string, toGroupId: string): Promise<IServerResponse<void>> => {
    const response = await apiClient.post(`${rootUrl}/convert-to-subtask`, {
      id: taskId,
      project_id: projectId,
      parent_task_id: parentTaskId,
      group_by: groupBy,
      to_group_id: toGroupId
    });
    return response.data;
  },

  convertToTask: async (taskId: string, projectId: string): Promise<IServerResponse<void>> => {
    const response = await apiClient.post(`${rootUrl}/convert`, {
      id: taskId,
      project_id: projectId
    });
    return response.data;
  },

};
