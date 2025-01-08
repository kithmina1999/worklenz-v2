import { IServerResponse } from '@/types/common.types';
import apiClient from '../api-client';
import { API_BASE_URL } from '@/shared/constants';
import { IOrganization, IOrganizationUser, IOrganizationTeam, IOrganizationUsersGetRequest, IOrganizationTeamGetRequest } from '@/types/admin-center/admin-center.types';
import { IClient } from '@/types/client.types';

const rootUrl = `${API_BASE_URL}/admin-center`;

export const adminCenterApiService = {

    async getOrganizationDetails(): Promise<IServerResponse<IOrganization>> {
        const response = await apiClient.get<IServerResponse<IOrganization>>(`${rootUrl}/organization`);
        return response.data;
    },

    async getOrganizationAdmins(): Promise<IServerResponse<IOrganizationUser[]>> {
        const response = await apiClient.get<IServerResponse<IOrganizationUser[]>>(`${rootUrl}/organization/admins`);
        return response.data;
    },

    async updateOrganizationName<T>(body: IClient): Promise<IServerResponse<IOrganization>> {
        const response = await apiClient.put<IServerResponse<IOrganization>>(`${rootUrl}/organization`, body);
        return response.data;
    },

    async updateOwnerContactNumber<T>(body: { contact_number: string }): Promise<IServerResponse<IOrganization>> {
        const response = await apiClient.put<IServerResponse<IOrganization>>(`${rootUrl}/organization/owner/contact-number`, body);
        return response.data;
    },

    async getOrganizationUsers(index: number, size: number, field: string | null, order: string | null, search: string | null): Promise<IServerResponse<IOrganizationUsersGetRequest>> {
        const s = encodeURIComponent(search || '');
        const params = new URLSearchParams({
            index: index.toString(),
            size: size.toString(),
            ...(field && { field }),
            ...(order && { order }),
            ...(s && { search: s })
        });
        const response = await apiClient.get<IServerResponse<IOrganizationUsersGetRequest>>(`${rootUrl}/organization/users?${params}`);
        return response.data;
    },

    async getOrganizationTeams(index: number, size: number, field: string | null, order: string | null, search: string | null): Promise<IServerResponse<IOrganizationTeamGetRequest>> {
        const s = encodeURIComponent(search || '');
        const params = new URLSearchParams({
            index: index.toString(),
            size: size.toString(),
            ...(field && { field }),
            ...(order && { order }),
            ...(s && { search: s })
        });
        const response = await apiClient.get<IServerResponse<IOrganizationTeamGetRequest>>(`${rootUrl}/organization/teams?${params}`);
        return response.data;
    },

    async getOrganizationTeam(team_id: string): Promise<IServerResponse<IOrganizationTeam>> {
        const response = await apiClient.get<IServerResponse<IOrganizationTeam>>(`${rootUrl}/organization/team/${team_id}`);
        return response.data;
    },

    async updateTeam(team_id: string, team_members: IOrganizationUser[]): Promise<IServerResponse<IOrganization>> {
        const response = await apiClient.put<IServerResponse<IOrganization>>(`${rootUrl}/organization/team/${team_id}`, team_members);
        return response.data;
    },

    async deleteTeam(id: string): Promise<IServerResponse<any>> {
        const response = await apiClient.delete<IServerResponse<any>>(`${rootUrl}/organization/team/${id}`);
        return response.data;
    },

    async removeTeamMember(team_member_id: string, team_id: string): Promise<IServerResponse<any>> {
        const response = await apiClient.put<IServerResponse<any>>(`${rootUrl}/organization/team-member/${team_member_id}`, {teamId: team_id});
        return response.data;
    }
}
