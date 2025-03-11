import { ITaskListColumn } from "@/types/tasks/taskList.types";
import apiClient from "../api-client";
import { IServerResponse } from "@/types/common.types";

export const tasksCustomColumnsService = {
  getCustomColumns: async (projectId: string): Promise<IServerResponse<ITaskListColumn[]>> => {
    const response = await apiClient.get(`/api/v1/custom-columns/project/${projectId}/columns`);
    return response.data;
  },
};
