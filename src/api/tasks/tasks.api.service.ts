import { ITaskListGroup, ITaskListMemberFilter } from '@/types/tasks/taskList.types';
import apiClient from '@api/api-client';
import { API_BASE_URL } from '@/shared/constants';
import { IServerResponse } from '@/types/common.types';
import { toQueryString } from '@/utils/toQueryString';
import { ITeamMemberViewModel } from '@/types/teamMembers/teamMembersGetResponse.types';

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

  fetchTaskAssignees: async (projectId: string): Promise<IServerResponse<ITeamMemberViewModel[]>> => {
    const response = await apiClient.get(`${rootUrl}/assignees/${projectId}`);
    return response.data;
  }
}
