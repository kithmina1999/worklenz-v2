import { API_BASE_URL } from "@/shared/constants";
import apiClient from "../api-client";
import { IServerResponse } from "@/types/common.types";
import { ITeamMemberViewModel } from "@/types/teamMembers/teamMembersGetResponse.types";
import { Settings } from "@/types/schedule/schedule-v2.types";

const rootUrl = `${API_BASE_URL}/schedule-gannt-v2`;

export const scheduleAPIService = {

    fetchScheduleSettings: async (): Promise<IServerResponse<Settings>> => {
        const response = await apiClient.get<IServerResponse<Settings>>(`${rootUrl}/settings`);
        return response.data;
    },

    updateScheduleSettings: async ({ workingDays, workingHours }: { workingDays: string[], workingHours: number }): Promise<IServerResponse<any>> => {
        const response = await apiClient.put<IServerResponse<any>>(`${rootUrl}/settings`,{workingDays, workingHours});
        return response.data;
    },
}