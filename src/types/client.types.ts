export type ClientType = {
  clientId: string;
  clientName: string;
  project: string | null;
};

export interface IClient {
  id?: string;
  name?: string;
  team_id?: string;
  created_at?: string;
  updated_at?: string;
}

