export interface ITeam {
  id?: string;
  name?: string;
  key?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ITeamInvites {
  id?: string;
  team_id?: string;
  team_member_id?: string;
  team_name?: string;
  team_owner?: string;
}

export interface IAcceptTeamInvite {
  team_member_id?: string;
  show_alert?: boolean;
}

export interface ITeamGetResponse extends ITeam {
  owner?: boolean;
  owns_by?: string;
  created_at?: string;
}

export interface ITeamState {
  teamsList: ITeamGetResponse[];
  isDrawerOpen: boolean;
  isSettingDrawerOpen: boolean;
  isUpdateTitleNameModalOpen: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}
